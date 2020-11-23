import express, { NextFunction, Request, Response } from "express";

const router = express.Router();


router.get('/:id/info', info);
router.get('/:id/total_sales', total_purchases)
router.get('/:id/accounts_receivable', accounts_payable)
router.get('/:id/top_products_purchased', top_products_sold)


function info(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function total_purchases(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function accounts_payable(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function top_products_sold(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;