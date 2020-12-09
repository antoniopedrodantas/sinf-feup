
function getLineTotal(generalLedgerAccounts: any, pos: Array<string>, neg: Array<string>) {

    

}


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
    
    const ODB = accountInfo["OpeningDebitBalance"];
    const OCB = accountInfo["OpeningCreditBalance"];
    const CDB = accountInfo["ClosingDebitBalance"];
    const CCB = accountInfo["ClosingCreditBalance"];

    // TODO: check this formula
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

export function getNetIncome(generalLedgerAccounts: any): number {

    // gets taxTotal from 646
    const result = getTaxonomyTotal(generalLedgerAccounts, "646");

    return result;
}

export function getFinancialPassives(generalLedgerAccounts: any): number {

    // gets taxTotal from 5
    const code5 = getTaxonomyTotal(generalLedgerAccounts, "5");

    // gets taxTotal from 7
    const code7 = getTaxonomyTotal(generalLedgerAccounts, "7");

    const result = code5 + code7;

    return result;
}

export function getInventory(generalLedgerAccounts: any): number {

    // gets taxTotal from 165
    const code165 = getTaxonomyTotal(generalLedgerAccounts, "165");

    // gets taxTotal from 166
    const code166 = getTaxonomyTotal(generalLedgerAccounts, "166");

    // gets taxTotal from 167
    const code167 = getTaxonomyTotal(generalLedgerAccounts, "167");

    // gets taxTotal from 168
    const code168 = getTaxonomyTotal(generalLedgerAccounts, "168");

    // gets taxTotal from 169
    const code169 = getTaxonomyTotal(generalLedgerAccounts, "169");

    // gets taxTotal from 170
    const code170 = getTaxonomyTotal(generalLedgerAccounts, "170");

    // gets taxTotal from 171
    const code171 = getTaxonomyTotal(generalLedgerAccounts, "171");

    // gets taxTotal from 172
    const code172 = getTaxonomyTotal(generalLedgerAccounts, "172");

    // gets taxTotal from 173
    const code173 = getTaxonomyTotal(generalLedgerAccounts, "173");

    // gets taxTotal from 174
    const code174 = getTaxonomyTotal(generalLedgerAccounts, "174");

    // gets taxTotal from 175
    const code175 = getTaxonomyTotal(generalLedgerAccounts, "175");

    // gets taxTotal from 176
    const code176 = getTaxonomyTotal(generalLedgerAccounts, "176");

    // gets taxTotal from 177
    const code177 = getTaxonomyTotal(generalLedgerAccounts, "177");

    // gets taxTotal from 178
    const code178 = getTaxonomyTotal(generalLedgerAccounts, "178");

    // gets taxTotal from 179
    const code179 = getTaxonomyTotal(generalLedgerAccounts, "179");

    // gets taxTotal from 180
    const code180 = getTaxonomyTotal(generalLedgerAccounts, "180");

    // gets taxTotal from 181
    const code181 = getTaxonomyTotal(generalLedgerAccounts, "181");

    // gets taxTotal from 182
    const code182 = getTaxonomyTotal(generalLedgerAccounts, "182");

    // gets taxTotal from 183
    const code183 = getTaxonomyTotal(generalLedgerAccounts, "183");

    // gets taxTotal from 184
    const code184 = getTaxonomyTotal(generalLedgerAccounts, "184");

    // gets taxTotal from 185
    const code185 = getTaxonomyTotal(generalLedgerAccounts, "185");

    // gets taxTotal from 186
    const code186 = getTaxonomyTotal(generalLedgerAccounts, "186");

    // gets taxTotal from 187
    const code187 = getTaxonomyTotal(generalLedgerAccounts, "187");

    // gets taxTotal from 188
    const code188 = getTaxonomyTotal(generalLedgerAccounts, "188");

    // gets taxTotal from 189
    const code189 = getTaxonomyTotal(generalLedgerAccounts, "189");

    // gets taxTotal from 190
    const code190 = getTaxonomyTotal(generalLedgerAccounts, "190");

    // gets taxTotal from 191
    const code191 = getTaxonomyTotal(generalLedgerAccounts, "191");

    // gets taxTotal from 192
    const code192 = getTaxonomyTotal(generalLedgerAccounts, "192");

    // gets taxTotal from 193
    const code193 = getTaxonomyTotal(generalLedgerAccounts, "193");

    // gets taxTotal from 194
    const code194 = getTaxonomyTotal(generalLedgerAccounts, "194");

    // gets taxTotal from 209
    const code209 = getTaxonomyTotal(generalLedgerAccounts, "209");

    // gets taxTotal from 210
    const code210 = getTaxonomyTotal(generalLedgerAccounts, "210");

    // gets taxTotal from 211
    const code211 = getTaxonomyTotal(generalLedgerAccounts, "211");

    // gets taxTotal from 212
    const code212 = getTaxonomyTotal(generalLedgerAccounts, "212");

    // gets taxTotal from 213
    const code213 = getTaxonomyTotal(generalLedgerAccounts, "213");

    const result = code165 + code166 + code167 - code168 - code169 - code170 + code171 + code172 + code173 + code174 + code175 + code176
                    - code177 - code178 - code179 - code180 - code181 - code182 + code183 + code184 - code185 - code186 + code187 + code188
                    + code189 - code190 - code191 - code192 + code193 + code194 + code209 + code210 + code211 + code212 + code213;

    return result;
}

export function getCashEquivalents(generalLedgerAccounts: any): number {

    // gets taxTotal from 216
    const code216 = getTaxonomyTotal(generalLedgerAccounts, "216");

    // gets taxTotal from 221
    const code221 = getTaxonomyTotal(generalLedgerAccounts, "221");

    // gets taxTotal from 226
    const code226 = getTaxonomyTotal(generalLedgerAccounts, "226");

    // gets taxTotal from 239
    const code239 = getTaxonomyTotal(generalLedgerAccounts, "239");

    // gets taxTotal from 244
    const code244 = getTaxonomyTotal(generalLedgerAccounts, "244");

    // gets taxTotal from 249
    const code249 = getTaxonomyTotal(generalLedgerAccounts, "249");

    const result = code216 + code221 + code226 - code239 - code244 - code249;

    return result;
}

export function getIntangibleAssets(generalLedgerAccounts: any): number {

    // gets taxTotal from 290
    const code290 = getTaxonomyTotal(generalLedgerAccounts, "290");

    // gets taxTotal from 291
    const code291 = getTaxonomyTotal(generalLedgerAccounts, "291");

    // gets taxTotal from 292
    const code292 = getTaxonomyTotal(generalLedgerAccounts, "292");

    // gets taxTotal from 293
    const code293 = getTaxonomyTotal(generalLedgerAccounts, "293");

    // gets taxTotal from 295
    const code295 = getTaxonomyTotal(generalLedgerAccounts, "295");

    // gets taxTotal from 296
    const code296 = getTaxonomyTotal(generalLedgerAccounts, "296");

    // gets taxTotal from 297
    const code297 = getTaxonomyTotal(generalLedgerAccounts, "297");

    // gets taxTotal from 298
    const code298 = getTaxonomyTotal(generalLedgerAccounts, "298");

    // gets taxTotal from 300
    const code300 = getTaxonomyTotal(generalLedgerAccounts, "300");

    // gets taxTotal from 301
    const code301 = getTaxonomyTotal(generalLedgerAccounts, "301");

    // gets taxTotal from 302
    const code302 = getTaxonomyTotal(generalLedgerAccounts, "302");

    // gets taxTotal from 303
    const code303 = getTaxonomyTotal(generalLedgerAccounts, "303");

    // gets taxTotal from 307
    const code307 = getTaxonomyTotal(generalLedgerAccounts, "307");

    // gets taxTotal from 311
    const code311 = getTaxonomyTotal(generalLedgerAccounts, "311");

    // gets taxTotal from 315
    const code315 = getTaxonomyTotal(generalLedgerAccounts, "315");

    // gets taxTotal from 319
    const code319 = getTaxonomyTotal(generalLedgerAccounts, "319");

    const result = code290 + code291 + code292 + code293 - code295 - code296 - code297 - code298 - code300 - code301 - code302
                    code303 + code307 + code311 - code315 - code319;

    return result;
}