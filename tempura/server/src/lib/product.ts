export function getUnitsSold(invoices: any, productInvoices: Array<any>) {

    // instanciates quantity
    let quantity = 0;

    // gets each bill that the product is in
    productInvoices.forEach(bill => {
        
        // gets its invoice and desired line
        const billInvoice = bill["Invoice"];
        const billLine = bill["Line"];

        if(invoices.hasOwnProperty(billInvoice)){

            quantity += getQuantity(invoices[billInvoice]["Line"], billLine);

        }

    });

    return quantity;

}

export function getAverageSalesPrice(invoices: any, productInvoices: Array<any>){
    
    // instanciates average sales price
    let avgSalesPrice = 0;

    let counter = 0;

    // gets each bill that the product is in
    productInvoices.forEach(bill => {
        
        // gets its invoice and desired line
        const billInvoice = bill["Invoice"];
        const billLine = bill["Line"];

        if(invoices.hasOwnProperty(billInvoice)){

            avgSalesPrice += getSalesPrice(invoices[billInvoice]["Line"], billLine);
            counter++;

        }

    });

    return avgSalesPrice / counter;

}

function getQuantity(lines: Array<any>, billLine: any) {

    let quantityAcc = 0;

    lines.forEach(line => {
        if(line["LineNumber"] == billLine){
            quantityAcc += parseInt(line["Quantity"], 10);
        }
    });

    return quantityAcc;

}

function getSalesPrice(lines: Array<any>, billLine: any): number {

    let unitPrice = 0;

    lines.forEach(line => {
        if(line["LineNumber"] == billLine){
            unitPrice = parseFloat(line["UnitPrice"]);
        }
    });

    return unitPrice;

}