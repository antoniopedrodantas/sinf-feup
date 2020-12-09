import express, { NextFunction, Request, Response } from "express";

import asyncMiddleware from '../middlewares/asyncMiddleware';
import authMiddleware from '../middlewares/authMiddleware';



import fs from "fs";
import { getLineTotal, getCodeOne, getExcedents, getSubscribedCapital, getNetIncome, getFinancialPassives, getInventory, getCashEquivalents, getIntangibleAssets } from "../lib/financial";
import { getSaftFiles } from "../lib/saft";

const router = express.Router();


router.get('/balance_sheet', authMiddleware, asyncMiddleware(balanceSheet));
router.get('/results_demonstration', authMiddleware, asyncMiddleware(resultsDemonstration));


async function balanceSheet(request: Request, response: Response, next: NextFunction) {

    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user param to query
    const safts = await getSaftFiles(start, end);

    // may not be needed anymore (?)
    var total = 0;

    // balance sheet fields

    // "Rendimentos e Gastos"
    let codeOne;
    let codeTwo;
    let codeThree;
    let codeFour;
    let codeFive;
    let codeSix;
    let codeSeven;
    let codeEight;
    let codeNine;
    let codeTen;
    let codeEleven;
    let codeTwelve;
    let codeThirteen;
    let codeFourteen;
    let codeFifteen;
    let codeSixteen;
    let codeSeventeen;
    let codeEighteen;
    let codeNineteen;
    let codeTwenty;
    let codeTwentyOne;
    let codeTwentyTwo;
    let codeTwentyThree;
    let codeTwentyFour;
    let codeTwentyFive;
    let codeTwentySix;
    let codeTwentySeven;

    let excedents;
    let subscribedCapital;
    let netIncome;
    let financialPassives;
    let inventory;
    let inventory2;
    let cashEquivalents;
    let intangibleAssets;

    safts.forEach(saft => {
        console.log(saft.path);

        const json = JSON.parse(fs.readFileSync(saft.path).toString());
        
        // -------------------------------------- "Rendimentos e gastos" ---------------------------------------
        // 1.
        codeOne = getLineTotal(json,
            ["506", "507", "508", "509", "510", "513", "514", "515", "516", "517"],
            ["511", "512", "518"]
        );

        // 2.
        codeTwo = getLineTotal(json,
                ["527", "528"],
                []
        );

        // 3.
        codeThree = getLineTotal(json,
            ["614", "615", "616", "638", "639"],
            ["479", "480", "481", "482"]
        );

        // 4.
        codeFour = getLineTotal(json,
            ["519", "520", "521", "522"],
            []
        );

        // 5.
        codeFive = getLineTotal(json,
            ["523", "524", "525", "526"],
            []
        );

        // 6.
        codeSix = getLineTotal(json,
            ["353", "354", "355"],
            []
        );

        // 7.
        codeSeven = getLineTotal(json,
            ["356", "357", "358", "359", "360", "361", "362", "363", "364", "365", "366", "367", "368", "369", "370", "371", "372", "373", "374", "375", "376", "377", "378", "379", "380", "381", "382", "383", "384"],
            []
        );

        // 8.
        codeEight = getLineTotal(json,
            ["385", "386", "387", "388", "389", "390", "391", "392", "393"],
            []
        );

        // 9.
        codeNine = 0;

        // 10.
        codeTen = getLineTotal(json,
            ["415", "416", "417", "418", "419", "420"],
            ["549", "550", "551", "552", "553", "554", "555"]
        );

        // 11.
        codeEleven = getLineTotal(json,
            ["413", "414"],
            ["547", "548"]
        );

        // 12.
        codeTwelve = getLineTotal(json,
            ["463", "464", "465", "466", "467", "468", "469", "470"],
            ["586", "587", "588", "589", "590", "591", "592", "593"]
        );

        // 13.
        codeThirteen = getLineTotal(json,
            ["412", "422", "423", "424", "425", "441", "442", "443", "444", "445", "446", "447", "448", "449", "450", "451", "452", "453"],
            ["555", "557", "558", "573", "574", "575", "576", "577", "578", "579", "580", "581", "582", "583", "584", "585"]
        );

        // 14.
        codeFourteen = 0;

        // 15.
        codeFifteen = getLineTotal(json,
            ["594", "595", "596", "597", "598", "599", "600", "601", "602"],
            ["454", "455", "456", "457", "458", "459", "460", "461", "462"]
        );

        // 16.
        codeSixteen = getLineTotal(json,
            ["603", "604", "605", "606", "607", "608", "609", "610", "611", "612", "613", "617", "618", "619", "620", "621", "622", "623", "624", "625", "626", "627", "628", "629", "630", "631", "632", "633", "634", "636", "637", "640", "642"],
            []
        );

        // 17.
        codeSeventeen = getLineTotal(json,
            ["471", "472", "473", "474", "475", "476", "477", "478", "483", "484", "485", "486", "487", "488", "489", "490", "491", "492", "493", "494", "495", "496", "497", "498", "499"],
            []
        );

        // 18.
        codeEighteen = codeOne + codeTwo + codeThree + codeFour + codeFive - codeSix - codeSeven - codeEight - codeNine - codeTen - codeEleven - codeTwelve - codeThirteen - codeFourteen + codeFifteen + codeSixteen - codeSeventeen;

        // 19.
        codeNineteen = getLineTotal(json,
            ["394", "395","396","397","398","399","400","401","402","403","404","405","406","407","408","409", "410", "411"],
            ["529","530","531","532","533","534","535","536","537","538","539","540","541","542","543","544","545", "546"]
        );

        // 20.
        codeTwenty = getLineTotal(json,
            ["426","427","428","429","430","431","432","433","434","435","436", "437", "438", "439", "440"],
            ["559","560","561","562","563","564","565","566","567","568","569","570","571","572"]
        );

        // 21.
        codeTwentyOne = codeEighteen - codeNineteen - codeTwenty;

        // 22.
        codeTwentyTwo = getLineTotal(json,
            ["635", "641"],
            []
        );

        // 23.
        codeTwentyThree = getLineTotal(json,
            ["500","501","502","503","504","505"],
            []
        );

        // 24.
        codeTwentyFour = codeTwentyOne + codeTwentyTwo - codeTwentyThree;

        // 25.
        codeTwentyFive = getLineTotal(json,
            ["644", "645"],
            []
        );

        // 26.
        codeTwentySix = codeTwentyFour - codeTwentyFive;

        // 27.
        codeTwentySeven = codeTwentySix;

        

        // ----------------------------------- gets "Balanço" ------------------------------------

        // gets "Excedentes de revalorização"
        excedents = getExcedents(json);

        // gets "Capital subscrito"
        subscribedCapital = getSubscribedCapital(json);

        // gets "Resultado líquido do perídod"
        netIncome = getNetIncome(json);

        // gets "Passivos financeiros detidos para negociação"
        financialPassives = getFinancialPassives(json);

        // gets "Inventários"
        inventory = getInventory(json);
        inventory2 = getLineTotal(json,
                               ["165", "166", "167", "171", "172", "173", "174", "175", "176", "183", "184", "187", "188", "189", "193", "209", "210", "211", "212", "213"],
                               ["168", "169", "170", "177", "178", "179", "180", "181", "182", "185", "186", "190", "191", "192", "194"]);

        // gets "Participações financeiras - método da equivalência patrimonial" (?)
        cashEquivalents = getCashEquivalents(json);

        // gets "Ativos intangiveis"
        intangibleAssets = getIntangibleAssets(json);

    });

    // "Rendimentos e Gastos"
    const incomeAndExpenses = {
        "1": codeOne,
        "2": codeTwo,
        "3": codeThree,
        "4": codeFour,
        "5": codeFive,
        "6": codeSix,
        "7": codeSeven,
        "8": codeEight,
        "9": codeNine,
        "10": codeTen,
        "11": codeEleven,
        "12": codeTwelve,
        "13": codeThirteen,
        "14": codeFourteen,
        "15": codeFifteen,
        "16": codeSixteen,
        "17": codeSeventeen,
        "18": codeEighteen,
        "19": codeNineteen,
        "20": codeTwenty,
        "21": codeTwentyOne,
        "22": codeTwentyTwo,
        "23": codeTwentyThree,
        "24": codeTwentyFour,
        "25": codeTwentyFive,
        "26": codeTwentySix,
        "27": codeTwentySeven
    };

    // Assets

    // Liabilities

    // Equity


    response
        .status(200)
        .send({
            error: false,
            "Income and Expenses": incomeAndExpenses,
            excedents: excedents,
            subscribedCapital: subscribedCapital,
            netIncome: netIncome,
            financialPassives: financialPassives,
            inventory: inventory,
            inventory2: inventory2,
            cashEquivalents: cashEquivalents,
            intangibleAssets: intangibleAssets,
        });
}

async function resultsDemonstration(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}





export default router;
