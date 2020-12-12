import express, { NextFunction, Request, Response } from "express";

import authMiddleware from "../middlewares/authMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";

import { getSaftFiles } from "../lib/saft";
import { TaxAccountingBasis } from "../entity/Saft";
import HttpException from "../exceptions/HttpException";
import fs from "fs";
import { getRevenueTotal, getAllProducts, getTopSellingProducts } from "../lib/miscellaneous";
import { json } from "body-parser";

const router = express.Router();


router.get('/total_profit', authMiddleware, asyncMiddleware(total_profit));
router.get('/total_revenue', authMiddleware, asyncMiddleware(total_revenue));
router.get('/revenue_growth', authMiddleware, asyncMiddleware(revenue_growth));
router.get('/top_selling_products', authMiddleware, asyncMiddleware(top_selling_products));


function total_profit(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

async function total_revenue(request: Request, response: Response, next: NextFunction) {

    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user parameter to query
    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    if (safts.length == 0) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Internal server error."))
    }

    // TODO: getting the first saft of the list is temporary
    const bills = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["Invoice"];

    const revenueTotal = getRevenueTotal(bills);

    response
        .status(200)
        .send({
            "profit": revenueTotal,
        });
}

function revenue_growth(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

async function top_selling_products(request: Request, response: Response, next: NextFunction) {
    
    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user parameter to query
    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    if (safts.length == 0) {
        // TODO: add descriptive error message and status code
        return next(new HttpException(500, "Internal server error."))
    }

    // TODO: getting the first saft of the list is temporary
    const bills = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["Invoice"];
    
    // gets the bills and all products available
    const productBills = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["ProductInvoice"];
    const products = getAllProducts(productBills); 

    // gets top selling products and then orders them
    const topSellingProducts = getTopSellingProducts(bills, products);
    topSellingProducts.sort(function(a: number[], b: number[]){
        if(a[1] < b[1]){
            return 1;
        }
        if(a[1] > b[1]){
            return -1;
        }
        return 0;
    });

    // creates JSON response
    let jsonResponse: { name: any; quantity: any; }[] = [];
    topSellingProducts.forEach((product: any) => {
        jsonResponse.push({
            "name": product[0],
            "quantity": product[1],
        })
    });

    // sends response
    response
        .status(200)
        .send({
            "products": jsonResponse,
        });
}

export default router;
