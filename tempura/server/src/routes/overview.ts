import express, { NextFunction, Request, Response } from "express";

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
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

async function liquidity(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}


export default router;
