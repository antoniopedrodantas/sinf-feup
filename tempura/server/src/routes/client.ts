import express, { NextFunction, Request, Response } from "express";

import authMiddleware from "../middlewares/authMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";
import { getSaftFiles } from "../lib/saft";
import { TaxAccountingBasis } from "../entity/Saft";
import HttpException from "../exceptions/HttpException";
import fs from "fs";


const router = express.Router();


router.get('/:id/info', authMiddleware, asyncMiddleware(info));
router.get('/:id/total_sales', authMiddleware, asyncMiddleware(total_sales))
router.get('/:id/accounts_receivable', authMiddleware, asyncMiddleware(accounts_receivable))
router.get('/:id/top_products_purchased', authMiddleware, asyncMiddleware(top_products_purchased))


async function info(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint

    const clientID = request.params.id;
    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user parameter to query
    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    if (safts.length == 0) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Internal server error."))
    }

    const customers = JSON.parse(fs.readFileSync(safts[0].path).toString())["MasterFiles"]["Customer"];

    if (!customers.hasOwnProperty(clientID)) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Client with specified id not found."))
    }

    const customer = customers[clientID];
    
    // TODO: change "Desconhecido" to "no information"
    response
        .status(200)
        .send({
            "name": customer.CompanyName,
            "country": customer.BillingAddress.Country,
            "taxID": customer.CustomerTaxID,
            "email": customer.Email,
            "phone": customer.Telephone
        })
}

async function total_sales(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

async function accounts_receivable(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

async function top_products_purchased(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;