export function getRevenueTotal(bills: any) {

    let revenueTotal = 0;

    for(let key in bills){
        revenueTotal += parseInt(bills[key]["DocumentTotals"]["NetTotal"]);
    }

    return revenueTotal;

}

export function getAllProducts(bills: any) {

    let products = [];

    for(let key in bills){
        products.push([key, 0]);
    }

    return products;

}

export function getTopSellingProducts(bills:any, products:any){

    let lines = [];

    for(let key in bills){

        lines = bills[key]["Line"];

        lines.forEach((line: any) => {
            const productCode = line["ProductCode"];
            const productQuantity = line["Quantity"];

            products.forEach((product: any) => {
                if(product[0] == productCode){
                    product[1] += parseInt(productQuantity);
                }
            });

        });

    }

    return products;

}

export function getRevenueGrowth(bills:any, daysArray:any){

    let jsonArray: { day: string, revenue_growth: number; }[] = [];
    let previousIncome = 1;

    daysArray.forEach((day: any) => {
        
        for(let key in bills){

            if(bills[key]["InvoiceDate"] == day){
                const revenueG = (bills[key]["DocumentTotals"]["NetTotal"] - previousIncome) / previousIncome;
                jsonArray.push({"day": day, "revenue_growth": revenueG});
                previousIncome = bills[key]["DocumentTotals"]["NetTotal"];
            }

        }

    });

    return jsonArray;

}
