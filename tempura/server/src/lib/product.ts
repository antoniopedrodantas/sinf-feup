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

function getQuantity(lines: Array<any>, billLine: any) {

    let quantityAcc = 0;

    lines.forEach(line => {
        if(line["LineNumber"] == billLine){
            quantityAcc += parseInt(line["Quantity"], 10);
        }
    });

    return quantityAcc;

}