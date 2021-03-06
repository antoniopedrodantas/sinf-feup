import asyncMiddleware from "../middlewares/asyncMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import HttpException from "../exceptions/HttpException";
import JasminRequester from "../lib/JasminRequester";
import { getAvgSupplierMargin, getLargestMarginSupplier } from "../lib/purchases";

const router = express.Router();


router.post('/average_margin_per_supplier', authMiddleware, asyncMiddleware(average_margin_per_supplier));
router.post('/largest_margin_supplier', authMiddleware, asyncMiddleware(largest_margin_supplier));
router.get('/top_purchased_products', authMiddleware, asyncMiddleware(top_purchased_products));
router.get('/supplier_country', authMiddleware, asyncMiddleware(supplier_country));
router.get('/top_suppliers', authMiddleware, asyncMiddleware(top_suppliers));


async function average_margin_per_supplier(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let avgMargin = await getAvgSupplierMargin(user, startDate, endDate);

    response
        .status(200)
        .send({ average_margin: avgMargin });
}

async function largest_margin_supplier(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(500, "User missing"));
    }

    const startDate = request.body.start_date;
    const endDate = request.body.end_date;

    let largestMarginSupplier = await getLargestMarginSupplier(user, startDate, endDate);

    response
        .status(200)
        .send({ supplier: largestMarginSupplier });
}

async function top_purchased_products(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(401, "User not logged in"));
    }

    let jasminRequest = new JasminRequester(user);
    try {
        let purchases = (await jasminRequest.getAllPurchaseOrders()).data
        let topProducts: { [key: string]: TopProduct } = {};

        purchases.forEach(order => {
            order.documentLines.forEach(product => {
                const productID = product.purchasesItemId
                if (!productID) {
                    return;
                }
                const topProduct = topProducts[productID];
                topProducts[productID] = {
                    name: product.purchasesItem,
                    id: productID,
                    price: (!topProduct) ? product.unitPrice.amount : Math.max(topProduct.price, product.unitPrice.amount),
                    total_sold: (!topProduct) ? product.quantity : topProduct.total_sold + product.quantity
                }
            })
        });
        let result = Object.values(topProducts).sort((p1, p2) => p2.total_sold - p1.total_sold)
        let limit = request.query.rows as string;
        if (limit) {
            result = result.slice(0, parseInt(limit));
            console.log(result)
        }
        return response.status(200).json(result);
    } catch (error) {
        return next(error);
    }
}

async function supplier_country(request: Request, response: Response, next: NextFunction) {
    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(401, "User not logged in"));
    }

    let jasminRequest = new JasminRequester(user);
    try {
        let countries: { [key: string]: SupplierCountry } = {}
        let purchases = (await jasminRequest.getAllPurchaseOrders()).data

        purchases.forEach(purchase => {
            const countryID = purchase.loadingCountryId;
            if (!countryID) {
                return;
            }
            const country = countries[countryID];
            countries[countryID] = {
                name: purchase.loadingCountryDescription,
                id: countryID,
                value: (!country) ? purchase.grossValue.amount : country.value + purchase.grossValue.amount
            }
        })
        let result = Object.values(countries);
        return response.status(200).json(result);
    } catch (error) {
        return next(error);
    }

}

async function top_suppliers(request: Request, response: Response, next: NextFunction) {

    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(401, "User not logged in"));
    }

    let jasminRequest = new JasminRequester(user);
    try {
        let topSuppliers: { [key: string]: TopSupplier } = {}
        let purchases = (await jasminRequest.getAllPurchaseOrders()).data

        purchases.forEach(purchase => {
            const supplierID = purchase.sellerSupplierPartyId;
            if (!supplierID) {
                return;
            }
            const topSupplier = topSuppliers[supplierID];
            topSuppliers[supplierID] = {
                name: purchase.sellerSupplierPartyName,
                total_spent: (!topSupplier) ? (purchase.grossValue.amount ?? 0) : topSupplier.total_spent + purchase.grossValue.amount,
                numOrders: (!topSupplier) ? 1 : topSupplier.numOrders + 1,
                max_spent: (!topSupplier) ? (purchase.grossValue.amount ?? 0) : Math.max(topSupplier.max_spent, purchase.grossValue.amount),
                id: purchase.sellerSupplierParty
            }

        });
        let result = Object.values(topSuppliers).sort((s1, s2) => s2.total_spent - s1.total_spent)
        let limit = request.query.rows as string;
        if (limit) {
            result = result.slice(0, parseInt(limit));
            console.log(result)
        }
        return response.status(200).json(result);
    } catch (error) {
        return next(error);
    }


}


export default router;
