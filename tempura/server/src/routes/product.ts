import express, { NextFunction, Request, Response } from "express";
import { getSaftFiles } from "../lib/saft";
import HttpException from "../exceptions/HttpException";
import fs from "fs";
import { TaxAccountingBasis } from "../entity/Saft";
import { getUnitsSold, getAverageSalesPrice } from "../lib/product";

import authMiddleware from "../middlewares/authMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";


const router = express.Router();


router.get('/:id/info', authMiddleware, asyncMiddleware(info));
router.get('/:id/total_units_sold', authMiddleware, asyncMiddleware(total_units_sold));
router.get('/:id/units_in_stock', authMiddleware, asyncMiddleware(units_in_stock));
router.get('/:id/average_sale_price', authMiddleware, asyncMiddleware(average_sale_price));
router.get('/:id/average_purchase_price', authMiddleware, asyncMiddleware(average_purchase_price));
router.get('/:id/average_profit_per_unit', authMiddleware, asyncMiddleware(average_profit_per_unit));
router.get('/:id/units_sold_per_day', authMiddleware, asyncMiddleware(units_sold_per_day));


async function info(request: Request, response: Response, next: NextFunction) {
    
    // gets params
    const productID = request.params.id;
    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user parameter to query
    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    if (safts.length == 0) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Internal server error."))
    }

    // TODO: getting the first saft of the list is temporary
    const products = JSON.parse(fs.readFileSync(safts[0].path).toString())["MasterFiles"]["Product"];

    if (!products.hasOwnProperty(productID)) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Client with specified id not found."))
    }

    // gets Product
    const product = products[productID];

    // TODO: get main supplier
    // const invoices = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["Invoice"];
    // const productInvoice = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["ProductInvoice"][productID];
    // const mainSupplier = getMainSupplier(invoices, productInvoice);

    const mainSupplier = {
        "id": "undefined",
        "name": "undefined"
    }

    response
        .status(200)
        .send({
            "name": productID,
            "description": product.ProductDescription,
            "main_supplier": mainSupplier,
            "bar_code": product.ProductNumberCode,
        });
}

async function total_units_sold(request: Request, response: Response, next: NextFunction) {
    
    // gets params
    const productID = request.params.id;
    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user parameter to query
    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    if (safts.length == 0) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Internal server error."))
    }

    // TODO: getting the first saft of the list is temporary
    const products = JSON.parse(fs.readFileSync(safts[0].path).toString())["MasterFiles"]["Product"];

    if (!products.hasOwnProperty(productID)) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Client with specified id not found."))
    }
    
    // gets the sold units
    const invoices = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["Invoice"];
    const productInvoice = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["ProductInvoice"][productID];
    const totalUnitsSold = getUnitsSold(invoices, productInvoice);

    response
        .status(200)
        .send({
            "units": totalUnitsSold,
        });
}

async function units_in_stock(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    // JASMIN
    response.send('NOT IMPLEMENTED');
}

async function average_sale_price(request: Request, response: Response, next: NextFunction) {
    
    // gets params
    const productID = request.params.id;
    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user parameter to query
    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    if (safts.length == 0) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Internal server error."))
    }

    // TODO: getting the first saft of the list is temporary
    const products = JSON.parse(fs.readFileSync(safts[0].path).toString())["MasterFiles"]["Product"];

    if (!products.hasOwnProperty(productID)) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Client with specified id not found."))
    }

    // gets the average sales price
    const invoices = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["Invoice"];
    const productInvoice = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["ProductInvoice"][productID];
    const averageSalesPrice = getAverageSalesPrice(invoices, productInvoice);
    
    response
        .status(200)
        .send({
            "avg_price": averageSalesPrice,
        });
}

async function average_purchase_price(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    // JASMIN
    response.send('NOT IMPLEMENTED');
}

async function average_profit_per_unit(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    // JASMIN
    response.send('NOT IMPLEMENTED');
}

async function units_sold_per_day(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;
