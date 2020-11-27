import express, { NextFunction, Request, Response } from "express";

const router = express.Router();


router.get('/total_assets_in_stock', total_assets_in_stock);
router.get('/inventory_turnover', inventory_turnover);
router.get('/inventory_period', inventory_period);
router.get('/average_sales_quantity', average_sales_quantity);
router.get('/product_listing', product_listing);

function total_assets_in_stock(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function inventory_turnover(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function inventory_period(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function average_sales_quantity(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function product_listing(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;
