import express, { NextFunction, Request, Response } from "express";

const router = express.Router();


router.get('/average_margin_per_supplier', average_margin_per_supplier);
router.get('/largest_margin_supplier', largest_margin_supplier);
router.get('/top_purchased_products', top_purchased_products);
router.get('/supplier_region', supplier_region);
router.get('/top_suppliers', top_suppliers);


function average_margin_per_supplier(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function largest_margin_supplier(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function top_purchased_products(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function supplier_region(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function top_suppliers(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}


export default router;
