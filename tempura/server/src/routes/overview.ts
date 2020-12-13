import express, { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import JasminRequester from "../lib/JasminRequester";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

import asyncMiddleware from "../middlewares/asyncMiddleware";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post('/total_profit', authMiddleware, asyncMiddleware(total_profit));
router.post('/total_costs', authMiddleware, asyncMiddleware(total_costs));
router.post('/liquidity', authMiddleware, asyncMiddleware(liquidity));


async function total_profit(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

async function total_costs(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let jasminRequest = new JasminRequester(user);
    try {
        let jasminResponse = (await jasminRequest.getAllPurchaseOrders()).data;

        let value = jasminResponse.reduce(
            (accumulator, order) => {
                const checkStartDate = (!!startDate && new Date(order.documentDate) >= new Date(startDate)) || !startDate;
                const checkEndDate = (!!endDate && new Date(order.documentDate) <= new Date(endDate)) || !endDate;

                if (checkStartDate && checkEndDate) {
                    accumulator += order.grossValue.amount;
                }

                return accumulator
            }, 0);

        response
            .status(200)
            .send({
                total_costs: value
            })
    } catch (error) {
        return next(new HttpException(500, "Server Error"));
    }
}

async function liquidity(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}


export default router;
