import asyncMiddleware from "../middlewares/asyncMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import express, { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import HttpException from "../exceptions/HttpException";
import JasminRequester from "../lib/JasminRequester";

const router = express.Router();


router.get('/average_margin_per_supplier', authMiddleware, asyncMiddleware(average_margin_per_supplier));
router.get('/largest_margin_supplier', authMiddleware, asyncMiddleware(largest_margin_supplier));
router.get('/top_purchased_products', authMiddleware, asyncMiddleware(top_purchased_products));
router.get('/supplier_region', authMiddleware, asyncMiddleware(supplier_region));
router.get('/top_suppliers', authMiddleware, asyncMiddleware(top_suppliers));


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

async function top_suppliers(request: Request, response: Response, next: NextFunction) {

    let user = await getRepository(User).findOne({ where: { id: request.user } });
    if (!user) {
        return next(new HttpException(401, "User not logged in"));
    }

    let jasminRequest = new JasminRequester(user);
    try {
        let jasminResponse = (await jasminRequest.getSupplierParty()).data;

        // let suppliers: { [key: string]: JasminResponse.SupplierParty } = {};
        let topSuppliers: { [key: string]: TopSupplier } = {}
        let purchases = (await jasminRequest.getAllPurchaseOrders()).data

        // jasminResponse.forEach((supplierParty) => {
        //     if (!supplierParty.id) return;
        //     suppliers[supplierParty.id] = supplierParty;
        // });

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
                max_spent: (!topSupplier) ? (purchase.grossValue.amount ?? 0) : Math.max(topSupplier.max_spent,purchase.grossValue.amount),
                id: supplierID
            }

        });
        let result = Object.values(topSuppliers).sort((a,b) => b.total_spent - a.total_spent)
        response.status(200).json(result).send();
    } catch (error) {
        return next(error);
    }


}


export default router;
