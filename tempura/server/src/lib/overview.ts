import { TaxAccountingBasis } from "../entity/Saft";
import { User } from "../entity/User";
import JasminRequester from "./JasminRequester";
import { getSaftFiles } from "./saft";
import fs from "fs";
import { getAssets, getLiabilities } from "./financial";
import HttpException from "../exceptions/HttpException";


export async function getTotalCosts(user: User, startDate: string, endDate: string) {
    let jasminRequest = new JasminRequester(user);

    let jasminResponse = (await jasminRequest.getAllPurchaseOrders()).data;

    let totalCosts = jasminResponse.reduce(
        (accumulator, order) => {
            const checkStartDate = (!!startDate && new Date(order.documentDate) >= new Date(startDate)) || !startDate;
            const checkEndDate = (!!endDate && new Date(order.documentDate) <= new Date(endDate)) || !endDate;

            if (checkStartDate && checkEndDate) {
                accumulator += order.grossValue.amount;
            }

            return accumulator
        }, 0);

    return totalCosts;
}


export async function getLiquidity(user: User, startDate: string, endDate: string) {

    // TODO: add user to this query
    const safts = await getSaftFiles(TaxAccountingBasis.ACCOUNTING, startDate, endDate);

    if (safts.length === 0) {
        throw new HttpException(500, "Internal server error.");
    }

    let currentAssets = 0, currentLiabilities = 0;
    safts.forEach(saft => {

        const json = JSON.parse(fs.readFileSync(saft.path).toString());

        // Current Assets
        currentAssets += getAssets(json, ["165", "166", "167", "171", "172", "173", "174", "175", "176", "183", "184", "187", "188", "189", "193", "209", "210", "211", "212", "213"], ["168", "169", "170", "177", "178", "179", "180", "181", "182", "185", "186", "190", "191", "192", "194"]);
        currentAssets += getAssets(json, ["195", "196", "214"], ["199", "201"]);
        currentAssets += getAssets(json, ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"], ["22", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36"]);
        currentAssets += getAssets(json, ["71", "73", "74", "76", "77", "79", "80", "81", "82", "83", "84", "85"], []);
        currentAssets += getAssets(json, ["106", "107"], ["115", "116"]);
        currentAssets += getAssets(json, ["37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "55", "56", "61", "63", "108", "109", "110", "111", "113", "124", "126", "128", "130", "138"], ["51", "52", "65", "66", "67", "69", "117", "118", "119", "120", "122", "140", "142", "144"]);
        currentAssets += getAssets(json, ["146"], []);
        currentAssets += getAssets(json, ["4", "6"], []);
        currentAssets += getAssets(json, ["8"], []);
        currentAssets += getAssets(json, ["320", "321", "322", "323", "324"], ["326", "327", "328", "329", "330"]);
        currentAssets += getAssets(json, ["1", "2", "3"], []);

        // Current Liabilities
        currentLiabilities += getLiabilities(json, ["37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"], []);
        currentLiabilities += getLiabilities(json, ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "137"], []);
        currentLiabilities += getLiabilities(json, ["71", "72", "75", "76", "77", "78", "81", "82", "83", "84", "85"], []);
        currentLiabilities += getLiabilities(json, ["2", "3", "86", "88", "90", "92", "94", "96", "98", "100", "102", "104"], []);
        currentLiabilities += getLiabilities(json, ["53", "54", "57", "59", "61", "63", "109", "110", "113", "124", "126", "131", "135", "138"], []);
        currentLiabilities += getLiabilities(json, ["147"], []);
        currentLiabilities += getLiabilities(json, ["5", "7"], []);
        currentLiabilities += getLiabilities(json, ["9"], []);
        currentLiabilities += getLiabilities(json, ["325"], []);
    });


    return currentAssets / currentLiabilities;
}