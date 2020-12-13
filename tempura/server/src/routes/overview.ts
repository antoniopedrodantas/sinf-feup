import express, { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import JasminRequester from "../lib/JasminRequester";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

import asyncMiddleware from "../middlewares/asyncMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import { getLiquidity, getTotalCosts } from "../lib/overview";
import { getTotalRevenue } from "../lib/miscellaneous";

const router = express.Router();

router.post('/total_profit', authMiddleware, asyncMiddleware(total_profit));
router.post('/total_costs', authMiddleware, asyncMiddleware(total_costs));
router.post('/liquidity', authMiddleware, asyncMiddleware(liquidity));


async function total_profit(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let totalCosts = await getTotalCosts(user, startDate, endDate);
    let totalRevenue = await getTotalRevenue(user, startDate, endDate);

    let totalProfit = totalRevenue - totalCosts;

    response
        .status(200)
        .send({ total_profit: totalProfit });
}

async function total_costs(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let totalCosts = await getTotalCosts(user, startDate, endDate);

    response
        .status(200)
        .send({ total_costs: totalCosts })
}

async function liquidity(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let liquidity = await getLiquidity(user, startDate, endDate);

    response
        .status(200)
        .send({ liquidity: liquidity.toFixed(2) });
}


export default router;
