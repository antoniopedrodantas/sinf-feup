


function getTaxonomyTotal(generalLedgerAccounts: any, taxonomyCode: string) {
    
    const taxCodes: any = generalLedgerAccounts["TaxonomyCodes"];

    if (!taxCodes.hasOwnProperty(taxonomyCode)) {
        return 0;
    }

    const accounts: Array<string> = taxCodes[taxonomyCode];

    let total: number = 0;
    accounts.forEach(account => {
        total += getAccountTotal(generalLedgerAccounts["Accounts"][account]);
    });

    return total;
}


function getAccountTotal(accountInfo: any): number {
    return 0;
}