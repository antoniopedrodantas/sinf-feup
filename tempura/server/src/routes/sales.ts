import express, { NextFunction, Request, Response } from "express";

import authMiddleware from "../middlewares/authMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";
import { getSaftFiles } from "../lib/saft";
import { TaxAccountingBasis } from "../entity/Saft";
import HttpException from "../exceptions/HttpException";
import fs from "fs";
import { ClientRequest } from "http";

const router = express.Router();


router.get('/cogs_vs_sales_revenue', authMiddleware, asyncMiddleware(cogs_vs_sr));
router.get('/top_clients', authMiddleware, asyncMiddleware(top_clients));
router.get('/average_sale_price', authMiddleware, asyncMiddleware(average_sale_price));

// cost of goods sold vs. sales revenue (chart)
async function cogs_vs_sr(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

async function top_clients(request: Request, response: Response, next: NextFunction) {

    const start = request.query.start_date;
    const end = request.query.end_date;

    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    if (safts.length == 0) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Internal server error."))
    }

    // TODO: getting the first saft on the list is temporary
    const jsonObj = JSON.parse(fs.readFileSync(safts[0].path).toString());

    const invoices = jsonObj.SourceDocuments.SalesInvoices.Invoice;
    const customers = jsonObj.MasterFiles.Customer;
    const customerInvoices = jsonObj.SourceDocuments.SalesInvoices.CustomerInvoice;
    let topClients: Array<any> = [];

    for (let customerID in customerInvoices) {
        let total = 0;
        let max = 0;
        
        const currInvoices: Array<any> = customerInvoices[customerID];
        currInvoices.forEach(invoiceID => {
            let invoiceTotal = parseFloat(invoices[invoiceID].DocumentTotals.NetTotal);
            
            total += invoiceTotal;

            if (invoiceTotal > max) {
                max = invoiceTotal;
            }
        });

        topClients.push({
            id: customerID,
            name: customers[customerID].CompanyName,
            total: total,
            orders: customerInvoices[customerID].length,
            max: max
        })
    }

    topClients.sort((c1: any, c2: any) => {
        if (c1.total > c2.total) {
            return -1;
        } else if (c1.total < c2.total) {
            return 1;
        }
        return 0;
    });

    response
        .status(200)
        .send({
            clients: topClients
    });
}

async function average_sale_price(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;
