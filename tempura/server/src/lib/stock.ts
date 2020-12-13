import { TaxAccountingBasis } from "../entity/Saft";
import { User } from "../entity/User";
import JasminRequester from "./JasminRequester";
import { getSaftFiles } from "./saft";
import fs from "fs";



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

    // TODO: getting the first saft of the list is temporary
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