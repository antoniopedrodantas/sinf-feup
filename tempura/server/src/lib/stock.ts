import { TaxAccountingBasis } from "../entity/Saft";
import { User } from "../entity/User";
import JasminRequester from "./JasminRequester";
import { getSaftFiles } from "./saft";
import fs from "fs";
import { getAvgPurchasePrice, getAvgSalePrice, getTotalUnitsSold } from "./product";



export async function getTotalAssetsInStock(user: User, startDate: string, endDate: string) {
    let jasminRequest = new JasminRequester(user);
    let jasminResponse = (await jasminRequest.getMaterialItems()).data;

    let totalAssets = jasminResponse.reduce((accumulator, item) => {

        const checkStartDate = (!!startDate && new Date(item.createdOn) >= new Date(startDate)) || !startDate;
        const checkEndDate = (!!endDate && new Date(item.createdOn) <= new Date(endDate)) || !endDate;

        if (!(checkStartDate && checkEndDate)) {
            return accumulator;
        }

        item.materialsItemWarehouses.forEach(wharehouse => {
            accumulator += wharehouse.inventoryBalance.amount;
        })

        return accumulator;
    }, 0);

    return totalAssets;
}

export async function getAvgSaleQuantity(user: User, startDate: string, endDate: string) {
    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, startDate, endDate);

    if (safts.length === 0) {
        return 0;
    }

    const json = JSON.parse(fs.readFileSync(safts[0].path).toString());

    let sum = 0, counter = 0;
    const invoices: any[] = json.SourceDocuments.SalesInvoices.Invoice;

    for (let invoiceID in invoices) {
        const invoice = invoices[invoiceID];

        const invoiceDate = new Date(invoice.InvoiceDate);

        const checkStartDate = (!!startDate && invoiceDate >= new Date(startDate)) || !startDate;
        const checkEndDate = (!!endDate && invoiceDate <= new Date(endDate)) || !endDate;

        if (!(checkStartDate && checkEndDate)) {
            continue;
        }

        const lines: any[] = invoice.Line;
        lines.forEach(line => {
            sum += parseFloat(line.Quantity);
        })

        counter++;
    }

    return sum / counter;
}

export async function getProductList(user: User, startDate: string, endDate: string) {
    let jasminRequest = new JasminRequester(user);
    let jasminResponse = (await jasminRequest.getMaterialItems()).data;

    let productList: ProductListEntry[] = [];

    await Promise.all(jasminResponse.map(async (item) => {
        const checkStartDate = (!!startDate && new Date(item.createdOn) >= new Date(startDate)) || !startDate;
        const checkEndDate = (!!endDate && new Date(item.createdOn) <= new Date(endDate)) || !endDate;

        if (!(checkStartDate && checkEndDate)) {
            return;
        }

        let productID = item.itemKey;

        let stock: number = 0;
        item.materialsItemWarehouses.forEach(wharehouse => {
            stock += wharehouse.stockBalance;
        });

        let sold = await getTotalUnitsSold(productID, user, startDate, endDate);
        let avgPurchasePrice = (await getAvgPurchasePrice(productID, user, startDate, endDate)).toFixed(2);
        let avgSellingPrice = (await getAvgSalePrice(productID, user, startDate, endDate)).toFixed(2);

        let product: ProductListEntry = {
            barcode: item.barcode,
            name: productID,
            stock: stock,
            sold: sold,
            avgPurchasePrice: avgPurchasePrice,
            avgSellingPrice: avgSellingPrice
        };

        productList.push(product);

    }));

    return productList;
}