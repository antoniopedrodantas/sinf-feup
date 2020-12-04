import express, { NextFunction, Request, Response } from "express";

const router = express.Router();


router.get('/total_profit', total_profit);
router.get('/total_revenue', total_revenue);
router.get('/revenue_growth', revenue_growth);
router.get('/top_selling_products', top_selling_products);


function total_profit(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function total_revenue(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function revenue_growth(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function top_selling_products(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;
