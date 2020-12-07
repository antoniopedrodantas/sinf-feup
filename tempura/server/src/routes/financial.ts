import express, { NextFunction, Request, Response } from "express";

import asyncMiddleware from '../middlewares/asyncMiddleware';
import authMiddleware from '../middlewares/authMiddleware';

import { Between, getRepository, MoreThanOrEqual } from "typeorm";
import { Saft, TaxAccountingBasis } from "../entity/Saft";

import fs from "fs";


const router = express.Router();


router.get('/balance_sheet', authMiddleware, asyncMiddleware(balanceSheet));
router.get('/results_demonstration', authMiddleware, asyncMiddleware(resultsDemonstration));


async function balanceSheet(request: Request, response: Response, next: NextFunction) {

    const saftRepository = getRepository(Saft);

    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user param to query
    const safts = await saftRepository.find({
        select: ["path"],
        where: [
            {
                start_date: Between(start, end),
                tax_accounting_basis: TaxAccountingBasis.ACCOUNTING
            },
            {
                end_date: Between(start, end),
                tax_accounting_basis: TaxAccountingBasis.ACCOUNTING
            }
        ],
        order: {
            created_at: "DESC",
        }
    });

    safts.forEach(saft => {
        console.log(saft.path);

        const json = JSON.parse(fs.readFileSync(saft.path).toString());

        

        console.log(json);
    });



    response
        .status(200)
        .send({
            error: false
        });
}

async function resultsDemonstration(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}





export default router;
