import { TaxAccountingBasis } from "../entity/Saft";
import { User } from "../entity/User";
import JasminRequester from "./JasminRequester";
import { getSaftFiles } from "./saft";
import fs from "fs";

export function getUnitsSold(invoices: any, productInvoices: Array<any>) {

    // instanciates quantity
    let quantity = 0;

    // gets each bill that the product is in
    productInvoices.forEach(bill => {

        // gets its invoice and desired line
        const billInvoice = bill["Invoice"];
        const billLine = bill["Line"];

        if (invoices.hasOwnProperty(billInvoice)) {

            quantity += getQuantity(invoices[billInvoice]["Line"], billLine);

        }

    });

    return quantity;

}

export function getUnitsSoldPerDay(invoices: any, productInvoices: Array<any>, daysArray: Array<any>) {

    let jsonArray: { day: string, quantity: number; }[] = [];

    daysArray.forEach(day => {

        let quantity = 0;

        productInvoices.forEach(bill => {

            // gets its invoice and desired line
            const billInvoice = bill["Invoice"];
            const billLine = bill["Line"];

            const billDate = invoices[billInvoice]["InvoiceDate"];

            if (invoices.hasOwnProperty(billInvoice) && billDate == day) {

                quantity += getQuantityWithDate(invoices[billInvoice]["Line"], billLine);

            }

        });

        if (quantity > 0) {
            jsonArray.push({ "day": day, "quantity": quantity });
        }

    });

    return jsonArray;

}

function getQuantity(lines: Array<any>, billLine: any) {

    let quantityAcc = 0;

    lines.forEach(line => {
        if (line["LineNumber"] == billLine) {
            quantityAcc += parseInt(line["Quantity"], 10);
        }
    });

    return quantityAcc;

}

function getSalesPrice(lines: Array<any>, billLine: any): number {

    let unitPrice = 0;

    lines.forEach(line => {
        if (line["LineNumber"] == billLine) {
            unitPrice = parseFloat(line["UnitPrice"]);
        }
    });

    return unitPrice;

}

function getQuantityWithDate(lines: Array<any>, billLine: any) {
    let quantityAcc = 0;

    lines.forEach(line => {
        if (line["LineNumber"] == billLine) {
            quantityAcc += parseInt(line["Quantity"], 10);
        }
    });

    return quantityAcc;
}

export async function getTotalUnitsSold(productID: string, user: User, startDate: string, endDate: string) {

    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, startDate, endDate);

    if (safts.length == 0) {
        return 0;
    }

    // TODO: getting the first saft of the list is temporary
    const json = JSON.parse(fs.readFileSync(safts[0].path).toString());
    const products = json["MasterFiles"]["Product"];

    if (!products.hasOwnProperty(productID)) {
        return 0;
    }
    
    // gets the sold units
    const invoices = json["SourceDocuments"]["SalesInvoices"]["Invoice"];
    const productInvoice = json["SourceDocuments"]["SalesInvoices"]["ProductInvoice"][productID];
    const totalUnitsSold = getUnitsSold(invoices, productInvoice);

    return totalUnitsSold;
}

export async function getAvgSalePrice(productID: string, user: User, startDate: string, endDate: string) {
    // TODO: add user to this query
    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, startDate, endDate);

    if (safts.length == 0) {
        return 0;
    }

    // TODO: getting the first saft of the list is temporary
    const json = JSON.parse(fs.readFileSync(safts[0].path).toString())
    const products = json["MasterFiles"]["Product"];

    if (!products.hasOwnProperty(productID)) {
        // TODO: what to do when the product is not found?
        return 0;
    }

    const invoices = json["SourceDocuments"]["SalesInvoices"]["Invoice"];
    const productInvoices: any[] = json["SourceDocuments"]["SalesInvoices"]["ProductInvoice"][productID];

    let sum = 0, counter = 0;

    // gets each bill that the product is in
    productInvoices.forEach(bill => {
        // gets its invoice and desired line
        const billInvoice = bill["Invoice"];
        const billLine = bill["Line"];

        if (invoices.hasOwnProperty(billInvoice)) {
            sum += getSalesPrice(invoices[billInvoice]["Line"], billLine);
            counter++;
        }
    });

    return sum / counter;
}

export async function getAvgPurchasePrice(productID: string, user: User, startDate: string, endDate: string) {
    let jasminRequest = new JasminRequester(user);

    let jasminResponse = (await jasminRequest.getAllPurchaseOrders()).data;

    let sum = 0, counter = 0;

    jasminResponse.forEach(order => {
        const checkStartDate = (!!startDate && new Date(order.documentDate) >= new Date(startDate)) || !startDate;
        const checkEndDate = (!!endDate && new Date(order.documentDate) <= new Date(endDate)) || !endDate;

        if (!(checkStartDate && checkEndDate)) {
            return;
        }

        order.documentLines.forEach(line => {
            if (line.purchasesItem !== productID) {
                return;
            }

            sum += line.unitPrice.amount;
            counter++;
        })
    })

    return sum / counter;
}