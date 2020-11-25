import express, { NextFunction, Request, Response } from "express";

const router = express.Router();


router.get('/total_profit', total_profit);
router.get('/revenue_growth', revenue_growth);


function total_profit(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function revenue_growth(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;
