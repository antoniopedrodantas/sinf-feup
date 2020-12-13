import express, { NextFunction, Request, Response } from "express";

import authMiddleware from "../middlewares/authMiddleware";
import asyncMiddleware from "../middlewares/asyncMiddleware";

import { getRepository } from "typeorm";
import { User } from "../entity/User";

import JasminRequester from "../lib/JasminRequester";
import HttpException from "../exceptions/HttpException";
import { TopProductEntry } from "@/@types/supplier";


const router = express.Router();


router.get('/:id/info', authMiddleware, asyncMiddleware(info));
router.post('/:id/total_sales', authMiddleware, asyncMiddleware(total_purchases))
router.post('/:id/accounts_payable', authMiddleware, asyncMiddleware(accounts_payable))
router.post('/:id/top_products_purchased', authMiddleware, asyncMiddleware(top_products_purchased))


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

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let jasminRequest = new JasminRequester(user);
    try {
        let jasminResponse = (await jasminRequest.getAllPurchaseOrders()).data;

        let value = jasminResponse.reduce(
            (accumulator, order) => {
                if (order.sellerSupplierParty !== supplierID) {
                    return accumulator;
                }

                const checkStartDate = (!!startDate && new Date(order.documentDate) >= new Date(startDate)) || !startDate;
                const checkEndDate = (!!endDate && new Date(order.documentDate) <= new Date(endDate)) || !endDate;

                if (checkStartDate && checkEndDate) {
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
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const supplierID = request.params.id;

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let jasminRequest = new JasminRequester(user);
    try {
        let jasminResponse = (await jasminRequest.getAccountsPayable()).data;

        let value = jasminResponse.reduce(
            (accumulator, accountsPayable) => {
                if (accountsPayable.accountingParty !== supplierID) {
                    return accumulator;
                }

                const checkStartDate = (!!startDate && new Date(accountsPayable.documentDate) >= new Date(startDate)) || !startDate;
                const checkEndDate = (!!endDate && new Date(accountsPayable.documentDate) <= new Date(endDate)) || !endDate;

                if (checkStartDate && checkEndDate) {
                    accumulator += accountsPayable.grossValue.amount;
                }

                return accumulator
            }, 0);

        response
            .status(200)
            .send({
                accounts_payable: value
            })
    } catch (error) {
        return next(new HttpException(500, "Server Error"));
    }
}

async function top_products_purchased(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const supplierID = request.params.id;

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let jasminRequest = new JasminRequester(user);
    try {
        let jasminResponse = (await jasminRequest.getAllPurchaseOrders()).data;

        let products: { [key: string]: TopProductEntry } = {};
        jasminResponse.forEach(order => {
            if (order.sellerSupplierParty !== supplierID) {
                return;
            }

            const checkStartDate = (!!startDate && new Date(order.documentDate) >= new Date(startDate)) || !startDate;
            const checkEndDate = (!!endDate && new Date(order.documentDate) <= new Date(endDate)) || !endDate;

            if (!(checkStartDate && checkEndDate)) {
                return;
            }

            order.documentLines.forEach(line => {
                let productID: string = line.purchasesItem;
                let quantity = line.quantity;

                if (productID in products) {
                    products[productID].units += quantity;
                } else {
                    products[productID] = {
                        id: productID,
                        name: productID,
                        units: quantity
                    }
                }
            })
        });

        let topProducts: TopProductEntry[] = Object.values(products);
        topProducts.sort((p1: TopProductEntry, p2: TopProductEntry) => {
            if (p1.units < p2.units) {
                return 1;
            } else if (p1.units > p2.units) {
                return -1;
            }
            return 0;
        });

        response
            .status(200)
            .send({
                products: topProducts
            })
    } catch (error) {
        return next(new HttpException(500, "Server Error"));
    }
}

export default router;