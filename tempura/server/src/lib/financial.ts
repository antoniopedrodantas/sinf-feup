
export function getLineTotal(generalLedgerAccounts: any, pos: Array<string>, neg: Array<string>) {

    let result = 0;

    pos.forEach(code => {
        result += getTaxonomyTotal(generalLedgerAccounts, code);
    });

    neg.forEach(code => {
        result -= getTaxonomyTotal(generalLedgerAccounts, code);
    });

    return result;

}

export function getAssets(generalLedgerAccounts: any, pos: Array<string>, neg: Array<string>){
    
    let tmp = getLineTotal(generalLedgerAccounts, pos, neg);

    if(tmp < 0){
        return 0;
    }
    else{
        return tmp;
    }

}

export function getLiabilities(generalLedgerAccounts: any, pos: Array<string>, neg: Array<string>){
    
    let tmp = getLineTotal(generalLedgerAccounts, pos, neg);

    if(tmp > 0){
        return 0;
    }
    else{
        return -tmp;
    }

}


export function getTaxonomyTotal(generalLedgerAccounts: any, taxonomyCode: string) {

    const taxCodes: any = generalLedgerAccounts["MasterFiles"]["GeneralLedgerAccounts"]["TaxonomyCodes"];

    if (!taxCodes.hasOwnProperty(taxonomyCode)) {
        return 0;
    }

    const accounts: Array<string> = taxCodes[taxonomyCode];

    let total: number = 0;
    accounts.forEach(account => {
        total += getAccountTotal(generalLedgerAccounts["MasterFiles"]["GeneralLedgerAccounts"]["Accounts"][account]);
    });

    return total;
}


export function getAccountTotal(accountInfo: any): number {
    
    const ODB = accountInfo["OpeningDebitBalance"];
    const OCB = accountInfo["OpeningCreditBalance"];
    const CDB = accountInfo["ClosingDebitBalance"];
    const CCB = accountInfo["ClosingCreditBalance"];

    // TODO: check this formula
    // returns ClosingDebit - ClosingCredit 
    return CDB - CCB;

}
