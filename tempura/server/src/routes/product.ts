import express, { NextFunction, Request, Response } from "express";


const router = express.Router();


router.get('/:id/info', info);
router.get('/:id/total_units_sold', total_units_sold);
router.get('/:id/units_in_stock', units_in_stock);
router.get('/:id/average_sale_price', average_sale_price);
router.get('/:id/average_purchase_price', average_purchase_price);
router.get('/:id/average_profit_per_unit', average_profit_per_unit);
router.get('/:id/units_sold_per_month', units_sold_per_month);


function info(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function total_units_sold(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function units_in_stock(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function average_sale_price(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function average_purchase_price(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function average_profit_per_unit(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function units_sold_per_month(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;
