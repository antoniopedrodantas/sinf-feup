import express, { NextFunction, Request, Response } from "express";

const router = express.Router();


router.get('/cogs_vs_sales_revenue', cogs_vs_sr);
router.get('/top_clients', top_clients);
router.get('/average_sale_price', average_sale_price);

// cost of goods sold vs. sales revenue (chart)
function cogs_vs_sr(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function top_clients(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function average_sale_price(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;
