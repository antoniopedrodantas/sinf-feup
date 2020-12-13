declare module JasminResponse {

    export interface Price {
        amount: number;
        baseAmount?: any;
        reportingAmount: number;
        fractionDigits: number;
        symbol: string;
    }

    export interface LastPrice {
        amount: number;
        baseAmount?: any;
        reportingAmount: number;
        fractionDigits: number;
        symbol: string;
    }

    export interface SupplierItemPrice {
        version: number[];
        versionByte: string;
        supplierPartyId: string;
        price: Price;
        priceAmount: number;
        lastPrice: LastPrice;
        lastPriceAmount: number;
        lastSourceDoc: string;
        lastSourceDocDate: Date;
        currency: string;
        currencyId: string;
        currencyDescription: string;
        unit: string;
        unitId: string;
        unitDescription: string;
        item: string;
        itemId: string;
        itemBaseEntityId: string;
        itemDescription?: any;
        baseCurrencyId?: any;
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

    export interface SupplierParty {
        version: number[];
        versionByte: string;
        settlementDiscountPercent: number;
        exchangeRateDate?: any;
        locked: boolean;
        partyKey: string;
        partyKeySegments?: any;
        partyKeySequenceId?: any;
        searchTerm?: any;
        name: string;
        companyTaxID: string;
        electronicMail?: any;
        telephone?: any;
        mobile?: any;
        websiteUrl?: any;
        notes?: any;
        picture?: any;
        pictureThumbnail?: any;
        streetName?: any;
        buildingNumber?: any;
        postalZone?: any;
        cityName?: any;
        contactName: string;
        contactTitle?: any;
        username?: any;
        externalId?: any;
        externalVersion?: any;
        isExternallyManaged: boolean;
        isPerson: boolean;
        supplierGroup: string;
        supplierGroupId: string;
        supplierGroupDescription: string;
        paymentTerm: string;
        paymentTermId: string;
        paymentTermDescription: string;
        deliveryTerm: string;
        deliveryTermId: string;
        deliveryTermDescription: string;
        paymentMethod: string;
        paymentMethodId: string;
        paymentMethodDescription: string;
        partyTaxSchema: string;
        partyTaxSchemaId: string;
        partyTaxSchemaDescription: string;
        partyWithholdingTaxSchema?: any;
        partyWithholdingTaxSchemaId?: any;
        partyWithholdingTaxSchemaDescription?: any;
        supplierItemPrices: SupplierItemPrice[];
        accountingParty?: any;
        accountingPartyId?: any;
        accountingPartyDescription?: any;
        currency: string;
        currencyId: string;
        currencyDescription: string;
        country: string;
        countryId: string;
        countryDescription: string;
        address: string;
        addressId: string;
        contact: string;
        contactId: string;
        culture: string;
        cultureId: string;
        cultureDescription: string;
        baseEntityId: string;
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

