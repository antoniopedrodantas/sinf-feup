declare module JasminResponse {

  type Token = {
    access_token: string,
    expires_in: number,
    token_type: String,
    scope: String
  };

  export interface AllowanceChargeAmount {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface GrossValue {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface PayableAmount {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface WTaxTotal {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface TaxTotal {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface TaxExclusiveAmount {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface SettledAmount {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface Discount {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface Amount {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface OpenAmount {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface WithholdingTaxAmount {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface OpenWithholdingTaxAmount {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface ReceiptLine {
    version: number[];
    versionByte: string;
    receiptId: string;
    settledAmount: SettledAmount;
    settledAmountAmount: number;
    discount: Discount;
    discountAmount: number;
    dueDate: Date;
    sourceDoc: string;
    issueDate: Date;
    amount: Amount;
    amountAmount: number;
    openAmount: OpenAmount;
    openAmountAmount: number;
    settled: boolean;
    currencyKey: string;
    withholdingTaxAmount: WithholdingTaxAmount;
    withholdingTaxAmountAmount: number;
    openWithholdingTaxAmount: OpenWithholdingTaxAmount;
    openWithholdingTaxAmountAmount: number;
    sourceDocId: string;
    exchangeRate: number;
    exchangeRateDecimalPlaces: number;
    exchangeRateDate: Date;
    settledOriginalAmount: number;
    settledOriginalAmountDecimalPlaces: number;
    baseExchangeRate: number;
    baseExchangeRateDecimalPlaces: number;
    reportingExchangeRate: number;
    reportingExchangeRateDecimalPlaces: number;
    originalExchangeRate: number;
    originalExchangeRateDecimalPlaces: number;
    accountPosting: string;
    accountPostingId: string;
    nature: number;
    natureDescription: string;
    financialArea: number;
    financialAreaDescription: string;
    paymentMethod: string;
    paymentMethodId: string;
    paymentMethodDescription: string;
    sourceSchemaEntity: string;
    sourceSchemaEntityId: string;
    currency: string;
    currencyId: string;
    currencyDescription: string;
    baseCurrencyId: string;
    baseCurrency?: any;
    baseCurrencyDescription?: any;
    reportingCurrencyId: string;
    reportingCurrency?: any;
    reportingCurrencyDescription?: any;
    index: number;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    isSystem: boolean;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
    draftId: string;
    subscriptionId?: any;
    _state: number;
  }

  export interface AccountsReceivable {
    version: number[];
    versionByte: string;
    seriesNumber: number;
    documentDate: string;
    postingDate: Date;
    remarks?: any;
    note?: any;
    partyAddress?: any;
    isPrinted?: any;
    noteToRecipient?: any;
    accountingSchemaLegalStamp?: any;
    paymentMethodStamp?: any;
    exchangeRate: number;
    exchangeRateDecimalPlaces: number;
    exchangeRateDate: Date;
    checkDate?: any;
    checkBank?: any;
    checkBranch?: any;
    checkAccount?: any;
    checkEndorsed: boolean;
    checkNumber?: any;
    issuePlace?: any;
    isPaymentMethodCheck: boolean;
    allowanceChargeAmount: AllowanceChargeAmount;
    allowanceChargeAmountAmount: number;
    grossValue: GrossValue;
    grossValueAmount: number;
    payableAmount: PayableAmount;
    payableAmountAmount: number;
    wTaxTotal: WTaxTotal;
    wTaxTotalAmount: number;
    taxTotal: TaxTotal;
    taxTotalAmount: number;
    taxExclusiveAmount: TaxExclusiveAmount;
    taxExclusiveAmountAmount: number;
    emailTo: string;
    legalStamp: string;
    isLocked: boolean;
    documentType: string;
    documentTypeId: string;
    documentTypeDescription: string;
    serie: string;
    serieId: string;
    serieDescription: string;
    accountingParty: string;
    accountingPartyId: string;
    accountingPartyDescription: string;
    company: string;
    companyId: string;
    companyDescription: string;
    receiptLines: ReceiptLine[];
    receiptTaxes: any[];
    receiptWTaxes: any[];
    reportingLines: any[];
    currency: string;
    currencyId: string;
    currencyDescription: string;
    financialAccount: string;
    financialAccountId: string;
    financialAccountDescription: string;
    cashFlowItem: string;
    cashFlowItemId: string;
    cashFlowItemDescription: string;
    paymentMethod: string;
    paymentMethodId: string;
    paymentMethodDescription: string;
    accountingSchema: number;
    accountingSchemaDescription: string;
    partyAccountingSchema: number;
    partyAccountingSchemaDescription: string;
    notification: string;
    notificationId: string;
    notificationDescription: string;
    lockReason?: any;
    lockReasonId?: any;
    lockReasonDescription?: any;
    baseCurrencyId: string;
    baseCurrency?: any;
    baseCurrencyDescription?: any;
    reportingCurrencyId: string;
    reportingCurrency?: any;
    reportingCurrencyDescription?: any;
    naturalKey: string;
    isDraft: boolean;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    isSystem: boolean;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
    draftId: string;
    subscriptionId?: any;
    _state: number;
  }

}

