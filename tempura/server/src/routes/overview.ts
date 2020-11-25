import express, { NextFunction, Request, Response } from "express";

const router = express.Router();


router.get('/total_costs', total_costs);
router.get('/liquidity', liquidity);


function total_costs(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function liquidity(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}


export default router;
