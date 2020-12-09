import express, { NextFunction, Request, Response } from "express";

import asyncMiddleware from '../middlewares/asyncMiddleware';
import authMiddleware from '../middlewares/authMiddleware';

import { Between, getRepository, MoreThanOrEqual } from "typeorm";
import { Saft, TaxAccountingBasis } from "../entity/Saft";

import fs from "fs";
import { getLineTotal, getCodeOne, getExcedents, getSubscribedCapital, getNetIncome, getFinancialPassives, getInventory, getCashEquivalents, getIntangibleAssets } from "../lib/saft";

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
    let netIncome;
    let financialPassives;
    let inventory;
    let inventory2;
    let cashEquivalents;
    let intangibleAssets;

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

        // gets "Resultado líquido do perídod"
        netIncome = getNetIncome(json);

        // gets "Passivos financeiros detidos para negociação"
        financialPassives = getFinancialPassives(json);

        // gets "Inventários"
        inventory = getInventory(json);
        inventory2 = getLineTotal(json,
                               ["165", "166", "167", "171", "172", "173", "174", "175", "176", "183", "184", "187", "188", "189", "193", "209", "210", "211", "212", "213"],
                               ["168", "169", "170", "177", "178", "179", "180", "181", "182", "185", "186", "190", "191", "192", "194"]);
        
        console.log("1: ", inventory);
        console.log("2: ", inventory2);

        // gets "Participações financeiras - método da equivalência patrimonial" (?)
        cashEquivalents = getCashEquivalents(json);

        // gets "Ativos intangiveis"
        intangibleAssets = getIntangibleAssets(json);

    });



    response
        .status(200)
        .send({
            error: false,
            salesAndServices: codeOne,
            excedents: excedents,
            subscribedCapital: subscribedCapital,
            netIncome: netIncome,
            financialPassives: financialPassives,
            inventory: inventory,
            inventory2: inventory2,
            cashEquivalents: cashEquivalents,
            intangibleAssets: intangibleAssets,
        });
}

async function resultsDemonstration(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}





export default router;
