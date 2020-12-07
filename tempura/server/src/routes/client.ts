import express, { NextFunction, Request, Response } from "express";

const router = express.Router();


router.get('/:id/info', info);
router.get('/:id/total_sales', total_sales)
router.get('/:id/accounts_receivable', accounts_receivable)
router.get('/:id/top_products_purchased', top_products_purchased)


function info(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function total_sales(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function accounts_receivable(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function top_products_purchased(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;