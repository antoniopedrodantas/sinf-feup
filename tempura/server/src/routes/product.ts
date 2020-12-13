import { User } from "../entity/User";
import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import JasminRequester from "../lib/JasminRequester";
import HttpException from "../exceptions/HttpException";
import authMiddleware from "../middlewares/authMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";


const router = express.Router();


router.get('/:id/info'                   ,authMiddleware, asyncMiddleware(info));
router.get('/:id/total_units_sold'       ,authMiddleware, asyncMiddleware(total_units_sold));
router.get('/:id/units_in_stock'         ,authMiddleware, asyncMiddleware(units_in_stock));
router.get('/:id/average_sale_price'     ,authMiddleware, asyncMiddleware(average_sale_price));
router.get('/:id/average_purchase_price' ,authMiddleware, asyncMiddleware(average_purchase_price));
router.get('/:id/average_profit_per_unit',authMiddleware, asyncMiddleware(average_profit_per_unit));
router.get('/:id/units_sold_per_month'   ,authMiddleware, asyncMiddleware(units_sold_per_month));


function info(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function total_units_sold(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

async function units_in_stock(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint

    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) return next(new HttpException(500, "User is missing"));
    const itemKey = request.params.id;

    let jasminRequest = new JasminRequester(user);
    try {
        let jasminResponse = (await jasminRequest.getMaterialItemKey(itemKey)).data;

        let value = jasminResponse.materialsItemWarehouses.reduce(
            (accumulator, warehouse) => {
                accumulator += warehouse.stockBalance
                return accumulator;
            }, 0
        )
        response.statusCode = 200;
        response.send({error: false, data: value})
    } catch (error) {
        return next(new HttpException(500, "Server Error"));
    }

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
