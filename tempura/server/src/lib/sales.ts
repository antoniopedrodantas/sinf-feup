import { TaxAccountingBasis } from "../entity/Saft";
import { User } from "../entity/User";
import { getSaftFiles } from "./saft";
import fs from "fs";
import { getAvgPurchasePrice } from "./product";


export async function getCostOfGoodsSoldVsSalesRevenue(user: User, startDate: string, endDate: string) {
    const safts = await getSaftFiles(TaxAccountingBasis.BILLING, startDate, endDate);

    if (safts.length === 0) {
        return 0;
    }

    const json = JSON.parse(fs.readFileSync(safts[0].path).toString());

    let result: { [date: string]: COGSvsSR } = {};
    let productPrice: { [id: string]: number } = {};
    
    const invoices: any[] = json.SourceDocuments.SalesInvoices.Invoice;
    for (let invoiceID in invoices) {
        const invoice = invoices[invoiceID];

        const invoiceDateStr = invoice.InvoiceDate;
        const invoiceDate = new Date(invoice.InvoiceDate);

        const checkStartDate = (!!startDate && invoiceDate >= new Date(startDate)) || !startDate;
        const checkEndDate = (!!endDate && invoiceDate <= new Date(endDate)) || !endDate;

        if (!(checkStartDate && checkEndDate)) {
            continue;
        }

        if (!result.hasOwnProperty(invoiceDateStr)) {
            result[invoiceDateStr] = { date: invoiceDateStr, cogs: 0, sr: 0 };
        }

        const lines: any[] = invoice.Line;
        await Promise.all(lines.map(async line => {
            const productID = line.ProductCode;

            if (!productPrice.hasOwnProperty(productID)) {
                productPrice[productID] = await getAvgPurchasePrice(productID, user, startDate,endDate);
            }

            const quantity = line.Quantity;

            result[invoiceDateStr].cogs += quantity * productPrice[productID];
            result[invoiceDateStr].sr += quantity * line.UnitPrice;
        }));
    }

    return Object.values(result);
}