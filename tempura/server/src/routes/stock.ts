import { User } from "../entity/User";
import HttpException from "../exceptions/HttpException";
import JasminRequester from "../lib/JasminRequester";
import asyncMiddleware from "../middlewares/asyncMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";

const router = express.Router();


router.post('/total_assets_in_stock', authMiddleware, asyncMiddleware(total_assets_in_stock));
router.get('/inventory_turnover', authMiddleware, asyncMiddleware(inventory_turnover));
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

    let jasminRequest = new JasminRequester(user);
    try {
        let jasminResponse = (await jasminRequest.getMaterialItems()).data;

        let totalAssets = jasminResponse.reduce(
            (accumulator, item) => {

                const checkStartDate = (!!startDate && new Date(item.createdOn) >= new Date(startDate)) || !startDate;
                const checkEndDate = (!!endDate && new Date(item.createdOn) <= new Date(endDate)) || !endDate;

                if (!(checkStartDate && checkEndDate)) {
                    return accumulator;
                }

                item.materialsItemWarehouses.forEach(wharehouse => {
                    accumulator += wharehouse.inventoryBalance.amount;
                })

                return accumulator;
            }, 0);

        response
            .status(200)
            .send({ total_assets: totalAssets })
    } catch (error) {
        return next(new HttpException(500, "Server Error"));
    }
}

async function inventory_turnover(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
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
