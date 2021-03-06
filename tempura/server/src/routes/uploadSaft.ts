import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { root } from "../path";
import fs from "fs";
import parser from "xml2json";

import { formatDate, formatDateString } from "../lib/date";

import { getRepository } from "typeorm";
import { Saft } from "../entity/Saft";

import parseJSON from "../lib/parser";
import HttpException from "../exceptions/HttpException";

import asyncMiddleware from "../middlewares/asyncMiddleware";


const router = express.Router();

const xsdPath = `${root}/safts/saftpt1.04_01.xsd`;

const storage = multer.diskStorage({
	destination: (request, file, next) => {
		next(null, `${root}/safts/tmp/`);
	},
	filename: (request, file, next) => {
		next(null, `${Math.floor(Date.now() / 1000)}`);
	}
});

const upload = multer({
	storage: storage,
	fileFilter: filefilter,
}).single('saft');


router.post('/upload', upload, asyncMiddleware(uploadfile));


function filefilter(request: Request, file: Express.Multer.File, next: multer.FileFilterCallback) {
	if (file.mimetype != 'application/xml' && file.mimetype != 'text/xml') {
		return next(new HttpException(415, 'Wrong file extension, not an xml file.'));
	}

	return next(null, true);
}

async function uploadfile(request: Request, response: Response, next: NextFunction) {

	// xml to json
	const xmlData = fs.readFileSync(`${root}/safts/tmp/${request.file.filename}`, 'utf8');
	let jsonObj = JSON.parse(parser.toJson(xmlData));

	// delete tmp file
	fs.unlinkSync(`${root}/safts/tmp/${request.file.filename}`);

	// remove header from json
	jsonObj = jsonObj["AuditFile"];
	const header = jsonObj["Header"];


	if (header["TaxAccountingBasis"] !== 'C' && header["TaxAccountingBasis"] !== 'F') {
		throw next(new HttpException(400, 'SAFT type not supported'));
	}

	let fileName = `${request.file.filename}.json`;

	const saftRepository = getRepository(Saft);

	const safts = await saftRepository.find({
		start_date: formatDateString(header.StartDate),
		end_date: formatDateString(header.EndDate),
		tax_accounting_basis: header.TaxAccountingBasis
	});


	if (safts.length === 0) {
		await saftRepository.save(getSaftInfo(fileName, header));
	} else if (safts.length === 1) {
		if (formatDate(safts[0].created_at) >= formatDateString(header.DateCreated)) {
			throw new HttpException(400, 'A more recent file has already been uploaded');
		} else {
			await saftRepository.delete({ id: safts[0].id })
			await saftRepository.save(getSaftInfo(fileName, header));
		}
	} else {
		throw next(new HttpException(500, 'Internal server error'))
	}

	parseJSON(jsonObj);

	fs.writeFileSync(`${root}/safts/${fileName}`, JSON.stringify(jsonObj));

	response
		.status(200)
		.send({
			error: false,
			message: 'Saft was uploaded successfuly!'
		});
}

function getSaftInfo(fileName: string, header: any) {
	return {
		name: fileName,
		start_date: new Date(header.StartDate),
		end_date: new Date(header.EndDate),
		created_at: new Date(header.DateCreated),
		path: `${root}/safts/${fileName}`,
		fiscal_year: parseInt(header.FiscalYear, 10),
		tax_accounting_basis: header.TaxAccountingBasis
	}
}





export default router;