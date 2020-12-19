import express, { NextFunction, Request, Response } from "express";

import authMiddleware from "../middlewares/authMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";

import { getSaftFiles } from "../lib/saft";
import { TaxAccountingBasis } from "../entity/Saft";
import HttpException from "../exceptions/HttpException";
import fs from "fs";
import { getRevenueTotal, getAllProducts, getTopSellingProducts, getRevenueGrowth, getTotalRevenue } from "../lib/miscellaneous";
import { json } from "body-parser";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const router = express.Router();



router.post('/total_revenue', authMiddleware, asyncMiddleware(total_revenue));
router.get('/revenue_growth', authMiddleware, asyncMiddleware(revenue_growth));
router.get('/top_selling_products', authMiddleware, asyncMiddleware(top_selling_products));



async function total_revenue(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let totalRevenue;
    try {
        totalRevenue = await getTotalRevenue(user, startDate, endDate);
    } catch (error) {
        return next(error);
    }

    response
        .status(200)
        .send({
            revenue: totalRevenue,
        });
}

async function revenue_growth(request: Request, response: Response, next: NextFunction) {
    
    const start = request.query.start_date;
    const end = request.query.end_date;

    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    if (safts.length == 0) {
        return next(new HttpException(500, "Internal server error."))
    }

    const bills = JSON.parse(fs.readFileSync(safts[0].path).toString())["SourceDocuments"]["SalesInvoices"]["Invoice"];

    // gets all days in the range of dates and them trims them for easy comparison
    var tmpDaysArray = getDaysArray(new Date(String(start)),new Date(String(end)));
    var daysArray = trimDaysArray(tmpDaysArray);

    const revenueGrowth = getRevenueGrowth(bills, daysArray);

    response
        .status(200)
        .send({
            "revenue_growth": revenueGrowth,
        });
}

async function top_selling_products(request: Request, response: Response, next: NextFunction) {
    
    const start = request.query.start_date;
    const end = request.query.end_date;

    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, start, end);

    if (safts.length == 0) {
        return next(new HttpException(500, "Internal server error."))
    }

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

// gets array of days between a range of dates
var getDaysArray = function(start: any, end: any) {
    for(var array=[], newDate = new Date(start); newDate <=end; newDate.setDate(newDate.getDate()+1)){
        array.push(new Date(newDate));
    }
    return array;
};

var trimDaysArray = function(array: Array<Date>){

    let newArray: String[] = [];

    array.forEach(d => {
        
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
