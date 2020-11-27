import express, { NextFunction, Request, Response } from "express";

const router = express.Router();


router.get('/balance_sheet', balance_sheet);
router.get('/accounts_payable', accounts_payable);
router.get('/accounts_receivable', accounts_receivable);


function balance_sheet(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function accounts_payable(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function accounts_receivable(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}


export default router;
