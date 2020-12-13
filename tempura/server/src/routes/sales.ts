import express, { NextFunction, Request, Response } from "express";

import authMiddleware from "../middlewares/authMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";
import { getSaftFiles } from "../lib/saft";
import { TaxAccountingBasis } from "../entity/Saft";
import HttpException from "../exceptions/HttpException";
import fs from "fs";
import { ClientRequest } from "http";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import JasminRequester from "../lib/JasminRequester";

const router = express.Router();


router.get('/cogs_vs_sales_revenue', authMiddleware, asyncMiddleware(cogs_vs_sr));
router.get('/top_clients', authMiddleware, asyncMiddleware(top_clients));
router.get('/top_sale_products', authMiddleware, asyncMiddleware(top_sale_products));
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
    const start = request.query.start_date;
    const end = request.query.end_date;

    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    if (safts.length == 0) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Internal server error."))
    }

    // TODO: getting the first saft on the list is temporary
    const jsonObj = JSON.parse(fs.readFileSync(safts[0].path).toString());

    let sum: number = 0, counter: number = 0;
    const invoicesObj = jsonObj.SourceDocuments.SalesInvoices.Invoice
    for (let invoiceID in invoicesObj) {
        sum += parseFloat(invoicesObj[invoiceID].DocumentTotals.NetTotal);
        counter++;
    }

    response
        .status(200)
        .send({
            avg_sale: sum / counter
    });
}

async function top_sale_products(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(401, "User not logged in"));
    }

    let jasminRequest = new JasminRequester(user);
    try {
        let sales = (await jasminRequest.getAllSaleOrders()).data
        let topProducts: { [key: string]: TopProduct } = {};

        sales.forEach(order => {
            order.documentLines.forEach(product => {
                const productID = product.salesItemId
                if (!productID) {
                    return;
                }
                const topProduct = topProducts[productID];
                topProducts[productID] = {
                    name: product.salesItem,
                    id: productID,
                    price: (!topProduct) ? product.unitPrice.amount : Math.max(topProduct.price, product.unitPrice.amount),
                    total_sold: (!topProduct) ? product.quantity : topProduct.total_sold + product.quantity
                }
            })
        });
        let result = Object.values(topProducts).sort((p1, p2) => p2.total_sold - p1.total_sold)
        response.status(200).json(result).send();
    } catch (error) {
        return next(error);
    }

    
}

export default router;
