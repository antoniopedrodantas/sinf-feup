
function parseJSON(jsonObj: any) {
    const header = jsonObj["Header"];

    delete jsonObj["Header"];

    if (jsonObj.hasOwnProperty("MasterFiles")) {
        let masterFiles = jsonObj["MasterFiles"];

        if (masterFiles.hasOwnProperty("GeneralLedgerAccounts")) {
            let accounts = parseGeneralLedgerAccounts(masterFiles["GeneralLedgerAccounts"]);
            masterFiles["GeneralLedgerAccounts"] = accounts;
        }

        if (masterFiles.hasOwnProperty("Customer")) {
            let customers = parseCustomers(masterFiles["Customer"]);
            masterFiles["Customer"] = customers;
        }

        if (masterFiles.hasOwnProperty("Supplier")) {
            let suppliers = parseSuppliers(masterFiles["Supplier"]);
            masterFiles["Supplier"] = suppliers;
        }

        if (masterFiles.hasOwnProperty("Product")) {
            let products = parseProducts(masterFiles["Product"]);
            masterFiles["Product"] = products;
        }
    }

    if (jsonObj.hasOwnProperty("SourceDocuments")) {
        let sourceDocuments = jsonObj["SourceDocuments"];

        if (sourceDocuments.hasOwnProperty("SalesInvoices")) {
            let salesInvoices = parseSalesInvoices(sourceDocuments["SalesInvoices"]);
            sourceDocuments["SalesInvoices"] = salesInvoices;
        }
    }

    

}


function parseGeneralLedgerAccounts(old: any) {
    let taxonomyCodes: any = {};
    let accounts: any = {};

    let oldAccounts: Array<any> = old["Account"];
    oldAccounts.forEach(element => {
        let id = element["AccountID"];

        delete element["AccountID"]
        let info = element;

        if (info.hasOwnProperty('TaxonomyCode')) {
            let code = info["TaxonomyCode"];
            delete info["TaxonomyCode"];

            if (taxonomyCodes.hasOwnProperty(code)) {
                taxonomyCodes[code].push(id);
            } else {
                taxonomyCodes[code] = [id];
            }
        }

        accounts[id] = info;
    });

    return {
        "TaxonomyReference": `${old["TaxonomyReference"]}`,
        "TaxonomyCodes": taxonomyCodes,
        "Accounts": accounts
    };
}

function parseCustomers(old: Array<any>) {
    let customers: any = {};

    old.forEach(element => {
        let id = element["CustomerID"];
        delete element["CustomerID"];

        customers[id] = element;
    });

    return customers;
}

function parseSuppliers(old: Array<any>) {
    let suppliers: any = {};

    old.forEach(element => {
        let id = element["SupplierID"];
        delete element["SupplierID"];

        suppliers[id] = element;
    })

    return suppliers;
}

function parseProducts(old: Array<any>) {
    let products: any = {};

    old.forEach(element => {
        let id = element["ProductCode"];
        delete element["ProductCode"];

        products[id] = element
    })

    return products;
}

function parseSalesInvoices(old: any) {
    let invoices: any = {};
    let customers: any = {};
    let products: any = {};

    let oldInvoices: Array<any> = old["Invoice"];
    oldInvoices.forEach(element => {
        let id = element["InvoiceNo"];
        delete element["InvoiceNo"];

        let customerID = element["CustomerID"];
        if (customers.hasOwnProperty(customerID)) {
            customers[customerID].push(id);
        } else {
            customers[customerID] = [customerID];
        }

        let lines: Array<any> = element["Line"];
        lines.forEach(line => {
            let number = line["LineNumber"];
            let productID = line["ProductCode"];

            if (products.hasOwnProperty(productID)) {
                products[productID].push({
                    "Invoice": id,
                    "Line": number
                });
            } else {
                products[productID] = [{
                    "Invoice": id,
                    "Line": number
                }];
            }
        });

        invoices[id] = element;
    });

    return {
        "NumberOfEntries": old["NumberOfEntries"],
        "TotalDebit": old["TotalDebit"],
        "TotalCredit": old["TotalCredit"],
        "Invoice": invoices,
        "CustomerInvoice": customers,
        "ProductInvoice": products
    }
}


export default parseJSON;