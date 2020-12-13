import { User } from "../entity/User";
import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import JasminRequester from "../lib/JasminRequester";
import HttpException from "../exceptions/HttpException";
import { getSaftFiles } from "../lib/saft";
import fs from "fs";
import { TaxAccountingBasis } from "../entity/Saft";
import { getUnitsSold, getUnitsSoldPerDay, getAvgPurchasePrice, getAvgSalePrice, getTotalUnitsSold } from "../lib/product";

import authMiddleware from "../middlewares/authMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";


const router = express.Router();


router.get('/:id/info', authMiddleware, asyncMiddleware(info));
router.post('/:id/total_units_sold', authMiddleware, asyncMiddleware(total_units_sold));
router.get('/:id/units_in_stock', authMiddleware, asyncMiddleware(units_in_stock));
router.post('/:id/average_sale_price', authMiddleware, asyncMiddleware(average_sale_price));
router.post('/:id/average_purchase_price', authMiddleware, asyncMiddleware(average_purchase_price));
router.post('/:id/average_profit_per_unit', authMiddleware, asyncMiddleware(average_profit_per_unit));
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
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    // gets params
    const productID = request.params.id;
    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let totalUnitsSold = await getTotalUnitsSold(productID, user, startDate, endDate);

    response
        .status(200)
        .send({
            units: totalUnitsSold,
        });
}

async function units_in_stock(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) return next(new HttpException(500, "User is missing"));
    const itemKey = request.params.id;

    let jasminRequest = new JasminRequester(user);
    try {
        let jasminResponse = (await jasminRequest.getMaterialItemKey(itemKey)).data;

        let value = jasminResponse.materialsItemWarehouses.reduce(
            (accumulator, warehouse) => {
                accumulator += warehouse.stockBalance
                return accumulator;
            }, 0
        )
        response.statusCode = 200;
        response.send({error: false, data: value})
    } catch (error) {
        return next(new HttpException(500, "Server Error"));
    }

}

async function average_sale_price(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    // gets params
    const productID = request.params.id;
    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let avgSalePrice = await getAvgSalePrice(productID, user, startDate, endDate);
    
    response
        .status(200)
        .send({
            average_sale_price: avgSalePrice.toFixed(2),
        });
}

async function average_purchase_price(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const productID = request.params.id;
    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let avgPurchasePrice = await getAvgPurchasePrice(productID, user, startDate, endDate);

    response
        .status(200)
        .send({ average_purchase_price: avgPurchasePrice.toFixed(2) });
}

async function average_profit_per_unit(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const productID = request.params.id;
    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let avgPurchasePrice = await getAvgPurchasePrice(productID, user, startDate, endDate);
    let avgSalePrice = await getAvgSalePrice(productID, user, startDate, endDate);

    console.log(avgPurchasePrice)
    console.log(avgSalePrice)

    let avgProfit = (avgSalePrice - avgPurchasePrice).toFixed(2);

    response
        .status(200)
        .send({ average_profit: avgProfit });
}

async function units_sold_per_day(request: Request, response: Response, next: NextFunction) {
    
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

    // gets all days in the range of dates and them trims them for easy comparison
    var tmpDaysArray = getDaysArray(new Date(String(start)),new Date(String(end)));

    var daysArray = trimDaysArray(tmpDaysArray);

    // gets invoice for each day
    const invoices = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["Invoice"];
    const productInvoice = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["ProductInvoice"][productID];
    const unitsPerDay = getUnitsSoldPerDay(invoices, productInvoice, daysArray);

    response
        .status(200)
        .send({
            "Units Per Day": unitsPerDay,
        });
}

// gets array of days between a range of dates
var getDaysArray = function(start: any, end: any) {
    for(var array=[], newDate = new Date(start); newDate <=end; newDate.setDate(newDate.getDate()+1)){
        array.push(new Date(newDate));
    }
    return array;
};

var trimDaysArray = function(array: Array<Date>){

    let newArray: String[] = [];

    array.forEach(d => {
        
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();

        if (month.length < 2){
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        const str = [year, month, day].join('-');

        newArray.push(str);

    });

    return newArray;
}

export default router;
