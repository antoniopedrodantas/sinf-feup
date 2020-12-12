import express, { NextFunction, Request, Response } from "express";

import authMiddleware from "../middlewares/authMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";
import { getSaftFiles } from "../lib/saft";
import { TaxAccountingBasis } from "../entity/Saft";
import HttpException from "../exceptions/HttpException";
import fs from "fs";
import JasminRequester from "../lib/JasminRequester";
import { getRepository } from "typeorm";
import { User } from "../entity/User";


const router = express.Router();


router.get('/:id/info', authMiddleware, asyncMiddleware(info));
router.get('/:id/total_sales', authMiddleware, asyncMiddleware(total_sales))
router.post('/:id/accounts_receivable', authMiddleware, asyncMiddleware(accounts_receivable))
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
            "email": (customer.Email === "Desconhecido") ? "no information" : customer.Email,
            "phone": (customer.Telephone === "Desconhecido") ? "no information" : customer.Telephone
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

    // TODO validar data


    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        response.statusCode = 500;
        response.send({ error: true, message: "User is missing" });
        return next();
    }

    let jasminRequest = new JasminRequester(user);
    try {
        let jasminResponse = (await jasminRequest.getAccountsReceivable()).data;
        let value = jasminResponse.reduce(
            (accumulator, accounts_receivable) => {
                if (accounts_receivable.accountingParty === request.params.id) {
                    accumulator += accounts_receivable.grossValue.amount;
                }
                return accumulator;
            }, 0);
        
        response.statusCode = 200;
        response.send({ error: false, data: value });
    } catch (error) {
        response.statusCode = 500;
        response.send({ message : "Server Error"});
    }

    

}

async function top_products_purchased(request: Request, response: Response, next: NextFunction) {
    const clientID = request.params.id;
    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user parameter to query
    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    if (safts.length == 0) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Internal server error."))
    }

    let tmpProducts: Array<any> = [];

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

            const lines: Array<any> = salesInvoices.Invoice[invoiceID].Line;
            lines.forEach(line => {
                const productID = line.ProductCode;

                if (tmpProducts.hasOwnProperty(productID)) {
                    tmpProducts[productID].units += line.Quantity;
                } else {
                    // TODO: product names are the same as codes,
                    // probably need to get the names from jasmin
                    tmpProducts[productID] = {
                        id: productID,
                        name: productID, 
                        units: line.Quantity
                    };
                }
            });
        });
    })

    let finalProducts = [];
    for (let code in tmpProducts) {
        finalProducts.push(tmpProducts[code])
        delete tmpProducts[code];
    }

    finalProducts.sort((obj1: any, obj2: any) => {
        if (obj1.units > obj2.units) {
            return 1;
        } else if (obj1.units < obj2.units) {
            return -1;
        }    
        return 0;
    })

    response
        .status(200)
        .send({
            products: finalProducts
        })
}

export default router;