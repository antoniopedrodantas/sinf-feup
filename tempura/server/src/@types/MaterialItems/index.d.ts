declare module JasminResponse {

    export interface CalculatedUnitCost {
        amount: number;
        baseAmount?: number;
        reportingAmount: number;
        fractionDigits: number;
        symbol: string;
    }

    export interface InventoryBalance {
        amount: number;
        baseAmount?: number;
        reportingAmount: number;
        fractionDigits: number;
        symbol: string;
    }

    export interface LastUnitCost {
        amount: number;
        baseAmount?: number;
        reportingAmount: number;
        fractionDigits: number;
        symbol: string;
    }

    export interface MaterialsItemWarehous {
        version: number[];
        versionByte: string;
        materialsItemId: string;
        stockBalance: number;
        stockBalanceDecimalPlaces: number;
        calculatedUnitCost: CalculatedUnitCost;
        calculatedUnitCostAmount: number;
        inventoryBalance: InventoryBalance;
        inventoryBalanceAmount: number;
        isLocked: boolean;
        committedQuantity: number;
        committedQuantityDecimalPlaces: number;
        orderedQuantity: number;
        orderedQuantityDecimalPlaces: number;
        lastUnitCost: LastUnitCost;
        lastUnitCostAmount: number;
        warehouse: string;
        warehouseId: string;
        warehouseDescription: string;
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
        createdOn: string;
        modifiedBy: string;
        modifiedOn: Date;
        draftId: string;
        subscriptionId?: any;
        _state: number;
    }

    export interface MaterialItems {
        version: number[];
        versionByte: string;
        maxStock?: any;
        maxStockDecimalPlaces: number;
        minStock?: any;
        minStockDecimalPlaces: number;
        itemKey: string;
        itemKeySegments?: any;
        itemKeySequenceId?: any;
        description: string;
        complementaryDescription?: any;
        barcode: string;
        image?: any;
        imageThumbnail?: any;
        remarks?: any;
        externalId?: any;
        externalVersion?: any;
        isExternallyManaged: boolean;
        materialsItemWarehouses: MaterialsItemWarehous[];
        defaultWarehouse: string;
        defaultWarehouseId: string;
        defaultWarehouseDescription: string;
        itemSubtype: string;
        itemSubtypeId: string;
        itemSubtypeDescription: string;
        assortment: string;
        assortmentId: string;
        assortmentDescription: string;
        brand?: any;
        brandId?: any;
        brandDescription?: any;
        brandModel?: any;
        brandModelId?: any;
        baseUnit: string;
        baseUnitId: string;
        baseUnitDescription: string;
        itemType: number;
        itemTypeDescription: string;
        baseEntityId: string;
        isDraft: boolean;
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        isSystem: boolean;
        createdBy: string;
        createdOn: string;
        modifiedBy: string;
        modifiedOn: Date;
        draftId: string;
        subscriptionId?: any;
        _state: number;
    }

}

