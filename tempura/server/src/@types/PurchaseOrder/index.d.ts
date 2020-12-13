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

    export interface TaxableAmount {
        amount: number;
        baseAmount: number;
        reportingAmount: number;
        fractionDigits: number;
        symbol: string;
    }

    export interface TaxAmount {
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
        taxableAmount: TaxableAmount;
        taxableAmountAmount: number;
        taxPercentage: number;
        taxAmount: TaxAmount;
        taxAmountAmount: number;
        currency: string;
        currencyId: string;
        currencyDescription: string;
        exemptionReasonCode: string;
        exemptionReasonCodeId: string;
        exemptionReasonCodeDescription: string;
        taxTypeCode: string;
        taxTypeCodeId: string;
        taxTypeCodeDescription: string;
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

    export interface UnitPrice {
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

    export interface TaxTotal2 {
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

    export interface TaxableAmount2 {
        amount: number;
        baseAmount?: any;
        reportingAmount: number;
        fractionDigits: number;
        symbol: string;
    }

    export interface TaxAmount2 {
        amount: number;
        baseAmount?: number;
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
        exemptionReasonCode: string;
        exemptionReasonCodeId: string;
        exemptionReasonCodeDescription: string;
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
        unitPrice: UnitPrice;
        unitPriceAmount: number;
        deliveryDate: Date;
        discount1: number;
        discount2: number;
        discount3: number;
        grossValue: GrossValue2;
        grossValueAmount: number;
        allowanceChargeAmount: AllowanceChargeAmount2;
        allowanceChargeAmountAmount: number;
        taxExclusiveAmount: TaxExclusiveAmount2;
        taxExclusiveAmountAmount: number;
        taxTotal: TaxTotal2;
        taxTotalAmount: number;
        lineExtensionAmount: LineExtensionAmount;
        lineExtensionAmountAmount: number;
        complementaryDescription?: any;
        invoicedQuantity: number;
        invoicedQuantityDecimalPlaces: number;
        receivedQuantity: number;
        receivedQuantityDecimalPlaces: number;
        sourceDoc?: any;
        sourceDocId?: any;
        sourceDocLine?: any;
        sourceDocLineId?: any;
        printAllDiscounts: string;
        commitmentReference?: any;
        currency: string;
        currencyId: string;
        currencyDescription: string;
        unit: string;
        unitId: string;
        unitDescription: string;
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
        purchasesItem: string;
        purchasesItemId: string;
        purchasesItemBaseEntityId: string;
        purchasesItemDescription: string;
        documentLineStatus: number;
        documentLineStatusDescription: string;
        sourceSchemaEntity?: any;
        sourceSchemaEntityId?: any;
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

    export interface PurchaseOrder {
        version: number[];
        versionByte: string;
        seriesNumber: number;
        documentDate: string;
        postingDate: Date;
        sellerSupplierPartyName: string;
        sellerSupplierPartyTaxId: string;
        sellerSupplierPartyAddress: string;
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
        taxIncluded: boolean;
        payableAmount: PayableAmount;
        payableAmountAmount: number;
        loadingPoint: string;
        loadingPointAddress: string;
        loadingStreetName?: any;
        loadingBuildingNumber?: any;
        loadingPostalZone?: any;
        loadingCityName?: any;
        loadingDateTime: Date;
        unloadingPoint: string;
        unloadingPointAddress: string;
        unloadingStreetName: string;
        unloadingBuildingNumber?: any;
        unloadingPostalZone: string;
        unloadingCityName: string;
        unloadingDateTime: Date;
        isPrinted: boolean;
        noteToRecipient?: any;
        note?: any;
        remarks?: any;
        autoCreated: boolean;
        sourceDoc?: any;
        sourceDocId?: any;
        legalStamp: string;
        deliveryOnInvoice: boolean;
        emailTo: string;
        discountInValueAmount: DiscountInValueAmount;
        discountInValueAmountAmount: number;
        documentType: string;
        documentTypeId: string;
        documentTypeDescription: string;
        company: string;
        companyId: string;
        companyDescription: string;
        serie: string;
        serieId: string;
        serieDescription: string;
        sellerSupplierParty: string;
        sellerSupplierPartyId: string;
        sellerSupplierPartyBaseEntityId: string;
        sellerSupplierPartyDescription: string;
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
        paymentMethod: string;
        paymentMethodId: string;
        paymentMethodDescription: string;
        paymentTerm: string;
        paymentTermId: string;
        paymentTermDescription: string;
        deliveryTerm: string;
        deliveryTermId: string;
        deliveryTermDescription: string;
        documentStatus: number;
        documentStatusDescription: string;
        documentTaxes: DocumentTax[];
        documentLines: DocumentLine[];
        sourceSchemaEntity?: any;
        sourceSchemaEntityId?: any;
        orderNature: number;
        orderNatureDescription: string;
        altAddress?: any;
        altAddressId?: any;
        accountingAltAddress?: any;
        accountingAltAddressId?: any;
        notification?: any;
        notificationId?: any;
        notificationDescription?: any;
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