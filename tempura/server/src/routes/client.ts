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


// TODO: maybe this should be done via jasmin
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

    // TODO: getting the first saft of the list is temporary
    const customers = JSON.parse(fs.readFileSync(safts[0].path).toString())["MasterFiles"]["Customer"];

    if (!customers.hasOwnProperty(clientID)) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Client with specified id not found."))
    }

    const customer = customers[clientID];
    
    response
        .status(200)
        .send({
            "name": customer.CompanyName,
            "country": customer.BillingAddress.Country,
            "taxID": customer.CustomerTaxID,
            "email": (customer.Email === "Desconhecido")? "no information" : customer.Email,
            "phone": (customer.Telephone === "Desconhecido")? "no information" : customer.Telephone
        })
}

async function total_sales(request: Request, response: Response, next: NextFunction) {

    const clientID: string = request.params.id;
    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user param to this query
    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    let totalSales = 0;
    safts.forEach(saft => {
        const jsonObj = JSON.parse(fs.readFileSync(saft.path).toString());

        const salesInvoices = jsonObj.SourceDocuments.SalesInvoices;
        
        if (!salesInvoices.CustomerInvoice.hasOwnProperty(clientID)) {
            return;
        }

        const customerInvoices: Array<string> = salesInvoices.CustomerInvoice[clientID];
        customerInvoices.forEach(invoiceID => {

            if (!salesInvoices.Invoice.hasOwnProperty(invoiceID)) {
                return;
            }

            totalSales += parseInt(salesInvoices.Invoice[invoiceID].DocumentTotals.GrossTotal, 10)
        });
    });

    response
        .status(200)
        .send({
            total_sales: totalSales
        });
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