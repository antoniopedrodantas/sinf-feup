import express, { NextFunction, Request, Response } from "express";

import authMiddleware from "../middlewares/authMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";

import { getRepository } from "typeorm";
import { User } from "../entity/User";

import JasminRequester from "../lib/JasminRequester";
import HttpException from "../exceptions/HttpException";


const router = express.Router();


router.get('/:id/info', authMiddleware, asyncMiddleware(info));
router.get('/:id/total_sales', authMiddleware, asyncMiddleware(total_purchases))
router.get('/:id/accounts_receivable', authMiddleware, asyncMiddleware(accounts_payable))
router.get('/:id/top_products_purchased', authMiddleware, asyncMiddleware(top_products_sold))


async function info(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const supplierID = request.params.id;

    let jasminRequest = new JasminRequester(user);
    try {
        let jasminResponse = (await jasminRequest.getSupplierParty(supplierID)).data;

        if (jasminResponse.hasOwnProperty("message")) {
            return next(new HttpException(404, "The supplier was not found"));
        }

        response
            .status(200)
            .send({
                id: supplierID,
                name: jasminResponse.name,
                country: jasminResponse.countryDescription,
                tax_id: jasminResponse.companyTaxID,
                email: (jasminResponse.electronicMail === null) ? "no information" : jasminResponse.electronicMail,
                phone: (jasminResponse.telephone === null) ? "no information" : jasminResponse.telephone
            })
    } catch (error) {
        return next(new HttpException(500, "Server Error"));
    }
}

async function total_purchases(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const supplierID = request.params.id;

    let jasminRequest = new JasminRequester(user);
    try {
        let jasminResponse = (await jasminRequest.getAllOrders()).data;

        let value = jasminResponse.reduce(
            (accumulator, order) => {
                if (order.sellerSupplierParty === supplierID) {
                    accumulator += order.grossValue.amount;
                }
                return accumulator
            }, 0);

        response
            .status(200)
            .send({
                total_sales: value
            })
    } catch (error) {
        return next(new HttpException(500, "Server Error"));
    }
}

async function accounts_payable(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

async function top_products_sold(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

export default router;