export function getRevenueTotal(bills: any) {

    let revenueTotal = 0;

    for(let key in bills){
        revenueTotal += parseInt(bills[key]["DocumentTotals"]["NetTotal"]);
    }

    return revenueTotal;

}