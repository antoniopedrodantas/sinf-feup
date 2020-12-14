import { seed1606344300862 } from "@/migration/1606344300862-seed";
import { User } from "../entity/User";
import JasminRequester from "./JasminRequester";
import { getAvgSalePrice } from "./product";




export async function getLargestMarginSupplier(user: User, startDate: string, endDate: string) {

    let supplierList = await getSupplierMarginList(user, startDate, endDate);

    if (supplierList.length === 0) {
        return "no information";
    }

    supplierList.sort((s1, s2) => {
        if (s1.margin < s2.margin) {
            return 1;
        } else if (s1.margin > s2.margin) {
            return -1;
        }
        return 0;
    })

    return supplierList[0];
}

export async function getAvgSupplierMargin(user: User, startDate: string, endDate: string) {

    let supplierList = await getSupplierMarginList(user, startDate, endDate);

    if (supplierList.length === 0) {
        return 0;
    }

    let sum = supplierList.reduce((accumulator, supplier) => {
        return accumulator += supplier.margin;
    }, 0);

    return sum / supplierList.length;
}

async function getSupplierMarginList(user: User, startDate: string, endDate: string) {

    let jasminRequest = new JasminRequester(user);
    const purchases = (await jasminRequest.getAllPurchaseOrders()).data

    let productPrice: { [id: string]: number } = {};
    let suppliers: { [id: string]: { id: string, name: string, margin: number } } = {}

    await Promise.all(purchases.map(async order => {

        const orderDateStr = order.documentDate;
        const orderDate = new Date(orderDateStr);

        const checkStartDate = (!!startDate && orderDate >= new Date(startDate)) || !startDate;
        const checkEndDate = (!!endDate && orderDate <= new Date(endDate)) || !endDate;

        if (!(checkStartDate && checkEndDate)) {
            return;
        }

        const supplierID = order.sellerSupplierParty;

        if (!suppliers.hasOwnProperty(supplierID)) {
            suppliers[supplierID] = { id: supplierID, name: order.sellerSupplierPartyName, margin: 0 };
        }

        await Promise.all(order.documentLines.map(async line => {
            const productID = line.purchasesItem;

            if (!productPrice.hasOwnProperty(productID)) {
                productPrice[productID] = await getAvgSalePrice(productID, user, startDate, endDate);
            }

            suppliers[supplierID].margin += line.quantity * productPrice[productID] - line.grossValue.amount;
        }))

    }));

    return Object.values(suppliers);
}