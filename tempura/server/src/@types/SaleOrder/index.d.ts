declare module JasminResponse {

  export interface GrossValue {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface AllowanceChargeAmount {
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

  export interface TaxTotal {
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

  export interface DiscountInValueAmount {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface UnitPrice {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface TaxTotal2 {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface AllowanceChargeAmount2 {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface TaxExclusiveAmount2 {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface GrossValue2 {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface LineExtensionAmount {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface TaxableAmount {
    amount: number;
    baseAmount?: any;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface TaxAmount {
    amount: number;
    baseAmount?: any;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface DocumentLineTax {
    version: number[];
    versionByte: string;
    orderLineId: string;
    orderId: string;
    isExempt: boolean;
    taxableAmount: TaxableAmount;
    taxableAmountAmount: number;
    taxPercentage: number;
    taxAmount: TaxAmount;
    taxAmountAmount: number;
    taxTypeCode: string;
    taxTypeCodeId: string;
    taxTypeCodeDescription: string;
    currency: string;
    currencyId: string;
    currencyDescription: string;
    exemptionReasonCode?: any;
    exemptionReasonCodeId?: any;
    exemptionReasonCodeDescription?: any;
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

  export interface DocumentLine {
    version: number[];
    versionByte: string;
    orderId: string;
    description: string;
    quantity: number;
    quantityDecimalPlaces: number;
    deliveredQuantity: number;
    deliveredQuantityDecimalPlaces: number;
    invoicedQuantity: number;
    invoicedQuantityDecimalPlaces: number;
    unitPrice: UnitPrice;
    unitPriceAmount: number;
    deliveryDate: Date;
    discount1: number;
    discount2: number;
    discount3: number;
    taxTotal: TaxTotal2;
    taxTotalAmount: number;
    allowanceChargeAmount: AllowanceChargeAmount2;
    allowanceChargeAmountAmount: number;
    taxExclusiveAmount: TaxExclusiveAmount2;
    taxExclusiveAmountAmount: number;
    grossValue: GrossValue2;
    grossValueAmount: number;
    lineExtensionAmount: LineExtensionAmount;
    lineExtensionAmountAmount: number;
    sourceDoc?: any;
    sourceDocId?: any;
    sourceDocLine?: any;
    sourceDocLineId?: any;
    complementaryDescription?: any;
    printAllDiscounts: string;
    commitmentReference?: any;
    sourceSchemaEntity?: any;
    sourceSchemaEntityId?: any;
    currency: string;
    currencyId: string;
    currencyDescription: string;
    unit: string;
    unitId: string;
    unitDescription: string;
    salesItem: string;
    salesItemId: string;
    salesItemBaseEntityId: string;
    salesItemDescription: string;
    itemTaxSchema: string;
    itemTaxSchemaId: string;
    itemTaxSchemaDescription: string;
    partyTaxSchema: string;
    partyTaxSchemaId: string;
    partyTaxSchemaDescription: string;
    documentLineTaxes: DocumentLineTax[];
    warehouse: string;
    warehouseId: string;
    warehouseDescription: string;
    documentLineStatus: number;
    documentLineStatusDescription: string;
    itemType: number;
    itemTypeDescription: string;
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

  export interface TaxableAmount2 {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface TaxAmount2 {
    amount: number;
    baseAmount: number;
    reportingAmount: number;
    fractionDigits: number;
    symbol: string;
  }

  export interface DocumentTax {
    version: number[];
    versionByte: string;
    orderId: string;
    isExempt: boolean;
    taxableAmount: TaxableAmount2;
    taxableAmountAmount: number;
    taxPercentage: number;
    taxAmount: TaxAmount2;
    taxAmountAmount: number;
    taxTypeCode: string;
    taxTypeCodeId: string;
    taxTypeCodeDescription: string;
    currency: string;
    currencyId: string;
    currencyDescription: string;
    exemptionReasonCode?: any;
    exemptionReasonCodeId?: any;
    exemptionReasonCodeDescription?: any;
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

  export interface SaleOrder {
    version: number[];
    versionByte: string;
    seriesNumber: number;
    documentDate: Date;
    postingDate: Date;
    taxIncluded: boolean;
    note?: any;
    buyerCustomerPartyName: string;
    buyerCustomerPartyAddress: string;
    buyerCustomerPartyTaxId: string;
    accountingPartyName: string;
    accountingPartyTaxId: string;
    accountingPartyAddress: string;
    exchangeRate: number;
    exchangeRateDecimalPlaces: number;
    exchangeRateDate: Date;
    discount: number;
    grossValue: GrossValue;
    grossValueAmount: number;
    allowanceChargeAmount: AllowanceChargeAmount;
    allowanceChargeAmountAmount: number;
    taxExclusiveAmount: TaxExclusiveAmount;
    taxExclusiveAmountAmount: number;
    taxTotal: TaxTotal;
    taxTotalAmount: number;
    payableAmount: PayableAmount;
    payableAmountAmount: number;
    remarks?: any;
    loadingPoint: string;
    loadingPointAddress: string;
    loadingStreetName: string;
    loadingBuildingNumber?: any;
    loadingPostalZone: string;
    loadingCityName: string;
    unloadingPoint: string;
    unloadingPointAddress: string;
    unloadingStreetName: string;
    unloadingBuildingNumber: string;
    unloadingPostalZone: string;
    unloadingCityName: string;
    pickingTime?: any;
    vehiclePlateNumber?: any;
    legalStamp: string;
    isPrinted: boolean;
    noteToRecipient?: any;
    sourceDoc?: any;
    sourceDocId?: any;
    autoCreated: boolean;
    isOneTimeCustomer?: any;
    deliveryOnInvoice: boolean;
    emailTo: string;
    hash: string;
    hashControl: string;
    discountInValueAmount: DiscountInValueAmount;
    discountInValueAmountAmount: number;
    printAllDiscounts: string;
    documentType: string;
    documentTypeId: string;
    documentTypeDescription: string;
    serie: string;
    serieId: string;
    serieDescription: string;
    buyerCustomerParty: string;
    buyerCustomerPartyId: string;
    buyerCustomerPartyBaseEntityId: string;
    buyerCustomerPartyDescription: string;
    accountingParty: string;
    accountingPartyId: string;
    accountingPartyDescription: string;
    loadingCountry: string;
    loadingCountryId: string;
    loadingCountryDescription: string;
    unloadingCountry: string;
    unloadingCountryId: string;
    unloadingCountryDescription: string;
    currency: string;
    currencyId: string;
    currencyDescription: string;
    documentLines: DocumentLine[];
    paymentMethod: string;
    paymentMethodId: string;
    paymentMethodDescription: string;
    paymentTerm: string;
    paymentTermId: string;
    paymentTermDescription: string;
    deliveryTerm: string;
    deliveryTermId: string;
    deliveryTermDescription: string;
    company: string;
    companyId: string;
    companyDescription: string;
    economicActivityClassification?: any;
    economicActivityClassificationId?: any;
    economicActivityClassificationDescription?: any;
    priceList: string;
    priceListId: string;
    priceListDescription: string;
    salesperson?: any;
    salespersonId?: any;
    salespersonBaseEntityId?: any;
    salespersonDescription?: any;
    documentTaxes: DocumentTax[];
    altAddress?: any;
    altAddressId?: any;
    documentStatus: number;
    documentStatusDescription: string;
    salesChannel?: any;
    salesChannelId?: any;
    salesChannelDescription?: any;
    sourceSchemaEntity?: any;
    sourceSchemaEntityId?: any;
    orderNature: number;
    orderNatureDescription: string;
    accountingAltAddress?: any;
    accountingAltAddressId?: any;
    notification: string;
    notificationId: string;
    notificationDescription: string;
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

