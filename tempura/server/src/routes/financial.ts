import express, { NextFunction, Request, Response } from "express";

import asyncMiddleware from '../middlewares/asyncMiddleware';
import authMiddleware from '../middlewares/authMiddleware';

import { Between, getRepository, MoreThanOrEqual } from "typeorm";
import { Saft, TaxAccountingBasis } from "../entity/Saft";

import fs from "fs";
import { getCodeOne, getExcedents, getSubscribedCapital, getTestValue } from "../lib/saft";

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

    // may not be needed anymore (?)
    var total = 0;

    // balance sheet fields
    let codeOne;
    let excedents;
    let subscribedCapital;
    let testValue;

    safts.forEach(saft => {
        console.log(saft.path);

        const json = JSON.parse(fs.readFileSync(saft.path).toString());

        // change 1 to desired taxonomyCodes
        // total += getTaxonomyTotal(json, "1");
        
        // gets "Vendas e Serviços Prestados"
        codeOne = getCodeOne(json);

        // gets "Excedentes de revalorização"
        excedents = getExcedents(json);

        // gets "Capital subscrito"
        subscribedCapital = getSubscribedCapital(json);

        // get test value
        testValue = getTestValue(json);

    });



    response
        .status(200)
        .send({
            error: false,
            salesAndServices: codeOne,
            excedents: excedents,
            subscribedCapital: subscribedCapital,
            testValue: testValue
        });
}

async function resultsDemonstration(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}





export default router;
