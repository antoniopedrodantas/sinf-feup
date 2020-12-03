import { JsonObject } from "swagger-ui-express";



function parseJSON(jsonObj: JsonObject) {
    const header = jsonObj["Header"];

    delete jsonObj["Header"];

    // convert GeneralLedgerAccounts
    if (jsonObj.hasOwnProperty("MasterFiles")) {
        let masterFiles = jsonObj["MasterFiles"];
        if (masterFiles.hasOwnProperty("GeneralLedgerAccounts")) {
            let accounts = parseGeneralLedgerAccounts(masterFiles["GeneralLedgerAccounts"]);
            masterFiles["GeneralLedgerAccounts"] = accounts;
        }
    }


    if (header["TaxAccountingBasis"] === 'C') {
        // accountability

        // only need the accounts ?
    } else if (header["TaxAccountingBasis"] === 'F') {
        // billing

    }
}


function parseGeneralLedgerAccounts(old: JsonObject) {
    let taxonomyCodes: JsonObject = {};
    let accounts: JsonObject = {};

    let oldAccounts: Array<JsonObject> = old["Account"];
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

export default parseJSON;