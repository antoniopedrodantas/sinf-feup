


function getTaxonomyTotal(generalLedgerAccounts: any, taxonomyCode: string) {
    
    console.log("TaxonomyCode: ", taxonomyCode);

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


function getAccountTotal(accountInfo: any): number {
    
    console.log(accountInfo);

    // accumulator
    let acc = 0;
        
    // gets values
    const ODB = accountInfo["OpeningDebitBalance"];
    const OCB = accountInfo["OpeningCreditBalance"];
    const CDB = accountInfo["ClosingDebitBalance"];
    const CCB = accountInfo["ClosingCreditBalance"];

    // returns opening balance
    return (CDB - ODB) + (CCB - OCB);

}

export default getTaxonomyTotal;