import { User } from "../entity/User";
import HttpException from "../exceptions/HttpException";
import JasminRequester from "../lib/JasminRequester";
import asyncMiddleware from "../middlewares/asyncMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import express, { NextFunction, Request, Response } from "express";

import { getTotalAssetsInStock } from "../lib/stock";

import { getRepository } from "typeorm";
import { getTotalRevenue } from "../lib/miscellaneous";

const router = express.Router();


router.post('/total_assets_in_stock', authMiddleware, asyncMiddleware(total_assets_in_stock));
router.post('/inventory_turnover', authMiddleware, asyncMiddleware(inventory_turnover));
router.get('/inventory_period', authMiddleware, asyncMiddleware(inventory_period));
router.get('/average_sales_quantity', authMiddleware, asyncMiddleware(average_sales_quantity));
router.get('/product_listing', authMiddleware, asyncMiddleware(product_listing));

async function total_assets_in_stock(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let totalAssets = await getTotalAssetsInStock(user, startDate, endDate);

    response
        .status(200)
        .send({ total_assets: totalAssets })
}

async function inventory_turnover(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let totalAssets = await getTotalAssetsInStock(user, startDate, endDate);
    let totalRevenue = await getTotalRevenue(user, startDate, endDate);

    console.log(totalAssets)
    console.log(totalRevenue)

    let inventoryTurnover = (totalRevenue / totalAssets).toFixed(2);

    response
        .status(200)
        .send({ inventory_turnover: inventoryTurnover })
}

async function inventory_period(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

async function average_sales_quantity(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

async function product_listing(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;
