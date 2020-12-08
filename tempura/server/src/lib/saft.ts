function getTaxonomyTotal(generalLedgerAccounts: any, taxonomyCode: string) {

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

export function getCodeOne(generalLedgerAccounts: any): number {

    // gets taxTotal from 506
    const code506 = getTaxonomyTotal(generalLedgerAccounts, "506");

    // gets taxTotal from 507
    const code507 = getTaxonomyTotal(generalLedgerAccounts, "507");

    // gets taxTotal from 508
    const code508 = getTaxonomyTotal(generalLedgerAccounts, "508");

    // gets taxTotal from 509
    const code509 = getTaxonomyTotal(generalLedgerAccounts, "509");

    // gets taxTotal from 510
    const code510 = getTaxonomyTotal(generalLedgerAccounts, "510");

    // gets taxTotal from 511
    const code511 = getTaxonomyTotal(generalLedgerAccounts, "511");

    // gets taxTotal from 512
    const code512 = getTaxonomyTotal(generalLedgerAccounts, "512");

    // gets taxTotal from 513
    const code513 = getTaxonomyTotal(generalLedgerAccounts, "513");

    // gets taxTotal from 514
    const code514 = getTaxonomyTotal(generalLedgerAccounts, "514");

    // gets taxTotal from 515
    const code515 = getTaxonomyTotal(generalLedgerAccounts, "515");

    // gets taxTotal from 516
    const code516 = getTaxonomyTotal(generalLedgerAccounts, "516");

    // gets taxTotal from 517
    const code517 = getTaxonomyTotal(generalLedgerAccounts, "517");

    // gets taxTotal from 518
    const code518 = getTaxonomyTotal(generalLedgerAccounts, "518");

    const result = code506 + code508 + code509 + code510 - code511 - code512 + code513 + code514 + code515 + code516 + code517 - code518;

    return result;
}

export function getExcedents(generalLedgerAccounts: any): number {

    // gets taxTotal from 343
    const code343 = getTaxonomyTotal(generalLedgerAccounts, "343");

    // gets taxTotal from 344
    const code344 = getTaxonomyTotal(generalLedgerAccounts, "344");

    // gets taxTotal from 345
    const code345 = getTaxonomyTotal(generalLedgerAccounts, "345");

    // gets taxTotal from 346
    const code346 = getTaxonomyTotal(generalLedgerAccounts, "346");

    const result = code343 - code344 + code345 - code346;

    return result;
}

export function getSubscribedCapital(generalLedgerAccounts: any): number {

    // gets taxTotal from 331
    const result = getTaxonomyTotal(generalLedgerAccounts, "331");

    return result;
}

export function getTestValue(generalLedgerAccounts: any): number {

    // gets taxTotal from 1
    const result = getTaxonomyTotal(generalLedgerAccounts, "1");

    return result;
}