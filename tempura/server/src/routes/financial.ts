import express, { NextFunction, Request, Response } from "express";

import asyncMiddleware from '../middlewares/asyncMiddleware';
import authMiddleware from '../middlewares/authMiddleware';



import fs from "fs";
import { getLineTotal } from "../lib/financial";
import { getSaftFiles } from "../lib/saft";
import { setupMaster } from "cluster";

const router = express.Router();

router.get('/balance_sheet', authMiddleware, asyncMiddleware(balanceSheet));
router.get('/results_demonstration', authMiddleware, asyncMiddleware(resultsDemonstration));

async function balanceSheet(request: Request, response: Response, next: NextFunction) {

    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user param to query
    const safts = await getSaftFiles(start, end);

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

    // Assets

    // Non Current Assets
    let tangibleFixedAssets;
    let investmentProperties;
    let goodwill;
    let intangibleAssets;
    let biologicalAssets;
    let financialHoldings;
    let otherFinancialInvestments;
    let accountsReceivable;
    let deferredTaxAssets;
    let financialInvestments;
    let creditsAndOther;
    let sum;

    // Current Assets
    let inventory;
    let biologicalAssets2;
    let clients;
    let governmentAndOther;
    let subscribedAndUnpaidCapital;
    let otherAccountsReceivable;
    let deferrals;
    let financialAssets;
    let otherFinancialAssets;
    let nonCurrentAssetsHeldForSale;
    let otherCurrentAssets;
    let cashAndBankDeposits;
    let sum2;

    // Total Assets
    let totalAssets;

    // Liabilities

    // Non Current Liabilities
    let provisions;
    let financingObtained;
    let responsabilities;
    let deferredTaxLiabilities;
    let accountsPayable;
    let sum3;

    // Current Liabilities
    let suppliers;
    let clientAdvances;
    let governmentAndOtherPublic;
    let financingObtained2;
    let otherAccountsPayable;
    let deferrals2;
    let financialLiabilities;
    let otherFinancialLiabilities;
    let nonCurrentLiabilitiesHeldForSale;
    let otherCurrentLiabilities;
    let sum4;

    // Total Liabilities
    let totalLiabilities;

    // Equity

    // Equity
    let subscribedCapital;
    let shares;
    let otherEquityInstruments;
    let issuePremiums;
    let legalReserves;
    let otherReserves;
    let transitedResults;
    let revaluationSurpluses;
    let adjustments;
    let netIncome;
    let anticipatedDividends;

    // Total Equity
    let totalEquity;

    // iterates through SAFT
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

        // ----------------------------------- gets "Non Current Assets" ------------------------------------

        // Tangible Fixed Assets.
        tangibleFixedAssets = getLineTotal(json,
            ["268","269","270","271","272","273", "274", "306", "310"],
            ["275","276","277","278","279","280","281","282","283","284","285","286","287","288", "314", "318"]
        );

        // Investment Properties
        investmentProperties = getLineTotal(json,
            ["259","260","261","305","309"],
            ["262","263","264","265","266","267","313","317"]
        );

        // Goodwill
        goodwill = getLineTotal(json,
            ["217","222","227","289"],
            ["236","237","238","240","245","250","294","299"]
        );

        // Intagible Assets
        intangibleAssets = getLineTotal(json,
            ["290","291","292","293","307","311"],
            ["295","296","297","298","300","301","302","303","315","319"]
        );

        // Biological Assets
        biologicalAssets = getLineTotal(json,
            ["197","198","215"],
            ["200","202"]
        );

        // Financial Holdings
        financialHoldings = getLineTotal(json,
            ["216","221","226"],
            ["239","244","249"]
        );

        // Other Financial Investments
        otherFinancialInvestments = getLineTotal(json,
            ["218","219","220","223","224","225","228","229","230","231","232","233","234","304","308"],
            ["235","241","242","243","246","247","248","251","252","253","254","255","256","257","258","312","316"]
        );

        // Accounts Receivable
        accountsReceivable = getLineTotal(json,
            ["62","64", "112","114","125","127","129","139"],
            ["68","70","121","123","141","145"]
        );

        // Deferred Tax Assets
        deferredTaxAssets = getLineTotal(json,
            ["133"],
            ["143"]
        );

        // Financial Investments
        financialInvestments = 0;

        // Credits and Other Non-Current Assets
        creditsAndOther = 0;

        sum = tangibleFixedAssets + investmentProperties + goodwill + intangibleAssets + biologicalAssets + financialHoldings + otherFinancialInvestments + accountsReceivable + deferredTaxAssets + financialInvestments + creditsAndOther;

        // ----------------------------------- gets "Current Assets" ------------------------------------

        // Inventory
        inventory = getLineTotal(json,
            ["165", "166", "167", "171", "172", "173", "174", "175", "176", "183", "184", "187", "188", "189", "193", "209", "210", "211", "212", "213"],
            ["168", "169", "170", "177", "178", "179", "180", "181", "182", "185", "186", "190", "191", "192", "194"]
        );

        // Biological Assets
        biologicalAssets2 = getLineTotal(json,
            ["195", "196", "214"],
            ["199","201"]
        );

        // Clients
        clients = getLineTotal(json,
            ["10","11","12","13","14","15","16","17","18","19","20","21"],
            ["22","24","25","26","27","28","29","30","31","32","33","34","35","36"]
        );

        // Government and Other Public Entities
        governmentAndOther = getLineTotal(json,
            ["71","73","74","76","77","79","80","81","82","83","84","85"],
            []
        );

        // Subscribed and Unpaid Capital
        subscribedAndUnpaidCapital = getLineTotal(json,
            ["106","107"],
            ["115","116"]
        );

        // Other Accounts Receivable
        otherAccountsReceivable = getLineTotal(json,
            ["37","38","39","40","41","42","43","44","45","46","47","48","49","50","55","56","61","63","108","109","110","111","113","124","126","128","130","138"],
            ["51","52","65","66","67","69","117","118","119","120","122","140","142","144"]
        );

        // Deferrals
        deferrals = getLineTotal(json,
            ["146"],
            []
        );

        // Financial Assets Held for Trading
        financialAssets = getLineTotal(json,
            ["4", "6"],
            []
        );

        // Other Financial Assets
        otherFinancialAssets = getLineTotal(json,
            ["8"],
            []
        );

        // Non-Current Assets Held for Sale
        nonCurrentAssetsHeldForSale = getLineTotal(json,
            ["320","321","322","323","324"],
            ["326","327","328","329","330"]
        );

        // Other Current Assets
        otherCurrentAssets = 0;

        // Cash and Bank Deposits
        cashAndBankDeposits = getLineTotal(json,
            ["1", "2", "3"],
            []
        );

        // Sum
        sum2 = inventory + biologicalAssets2 + clients + governmentAndOther + subscribedAndUnpaidCapital + otherAccountsReceivable + deferrals + financialAssets + otherFinancialAssets + nonCurrentAssetsHeldForSale + otherCurrentAssets + cashAndBankDeposits;

        totalAssets = sum + sum2;

        // ----------------------------------- gets "Non Current Liabilities" ------------------------------------

        // Provisions
        provisions = getLineTotal(json,
            ["148","149","150","151","152","153","154","155"],
            []
        );

        // Financing Obtained
        financingObtained = getLineTotal(json,
            ["87","89","91","93","95","97","99","101","103","105"],
            []
        );

        // Responsibilities for Post-Employment Benefits
        responsabilities = getLineTotal(json,
            ["132"],
            []
        );

        // Deferred Tax Liabilities
        deferredTaxLiabilities = getLineTotal(json,
            ["134"],
            []
        );

        // Accounts Payable
        accountsPayable = getLineTotal(json,
            ["58","60","62","64","114","125","127","136","139"],
            []
        );

        // Sum
        sum3 = provisions + financingObtained + responsabilities + deferredTaxLiabilities + accountsPayable;

        // ----------------------------------- gets "Current Liabilities" ------------------------------------

        // Suppliers
        suppliers = getLineTotal(json,
            ["37","38","39","40","41","42","43","44","45","46","47","48","49","50"],
            []
        );

        // Client Advances
        clientAdvances = getLineTotal(json,
            ["10","11","12","13","14","15","16","17","18","19","20","21","22","23","137"],
            []
        );

        // Government and Other Public Entities
        governmentAndOtherPublic = getLineTotal(json,
            ["71","72","75","76","77","78","81","82","83","84","85"],
            []
        );

        // Financing Obtained
        financingObtained2 = getLineTotal(json,
            ["2","3","86","88","90","92","94","96","98","100","102","104"],
            []
        );

        // Other Accounts Payable
        otherAccountsPayable = getLineTotal(json,
            ["53","54","57","59","61","63","109","110","113","124","126","131","135","138"],
            []
        );

        // Deferrals
        deferrals2 = getLineTotal(json,
            ["147"],
            []
        );

        // Financial Liabilities Held for Trading
        financialLiabilities = getLineTotal(json,
            ["5", "7"],
            []
        );

        // Other Financial Liabilities
        otherFinancialLiabilities = getLineTotal(json,
            ["9"],
            []
        );

        // Non-Current Liabilities Held for Sale
        nonCurrentLiabilitiesHeldForSale = getLineTotal(json,
            ["325"],
            []
        );

        // Other Current Liabilities
        otherCurrentLiabilities = 0;

        // Sum
        sum4 = suppliers + clientAdvances + governmentAndOtherPublic + financingObtained2 + otherAccountsPayable + deferrals2 + financialLiabilities + otherFinancialLiabilities + nonCurrentLiabilitiesHeldForSale + otherCurrentLiabilities;

        totalLiabilities = sum3 + sum4;

        // ----------------------------------- gets "Equity" ------------------------------------

        // Subscribed Capital
        subscribedCapital = getLineTotal(json,
            ["331"],
            []
        );

        // Shares
        shares = getLineTotal(json,
            [],
            ["332","333"]
        );

        // Other Equity Instruments
        otherEquityInstruments = getLineTotal(json,
            ["334"],
            []
        );

        // Issue Premiums
        issuePremiums = getLineTotal(json,
            ["335"],
            []
        );

        // Legal Reserves
        legalReserves = getLineTotal(json,
            ["336"],
            []
        );

        // Other Reserves
        otherReserves = getLineTotal(json,
            ["337"],
            []
        );

        // Transited Results
        transitedResults = getLineTotal(json,
            ["338"],
            []
        );

        // Revaluation Surpluses
        revaluationSurpluses = getLineTotal(json,
            ["343","345"],
            ["344","346"]
        );

        // Adjustments/Other Changes in Equity
        adjustments = getLineTotal(json,
            ["339","340","341","342","347","348","342","351","352"],
            ["350"]
        );

        // Net Income for the Period
        netIncome = getLineTotal(json,
            ["646"],
            []
        );

        // Anticipated Dividends
        anticipatedDividends = getLineTotal(json,
            [],
            ["647"]
        );

    });

    // ----------------------------------- JSON Response ------------------------------------

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

    const nonCurrentAssets = {
        "Tangible Fixed Assets": tangibleFixedAssets,
        "Investment Properties": investmentProperties,
        "Goodwill": goodwill,
        "Intangible Assets": intangibleAssets,
        "Biologic Assets": biologicalAssets,
        "Financial Holdings": financialHoldings,
        "Other Financial Investments": otherFinancialInvestments,
        "Accounts Receivable": accountsReceivable,
        "Deferred Tax Assets": deferredTaxAssets,
        "Financial Investments": financialInvestments,
        "Credits and Other Non-Current Assets": creditsAndOther,
        "Sum": sum
    }

    const currentAssets = {
        "Inventory": inventory,
        "Biologic Assets": biologicalAssets2,
        "Clients": clients,
        "Government and Other Public Entities": governmentAndOther,
        "Subscribed and Unpaid Capital": subscribedAndUnpaidCapital,
        "Other Accounts Receivable": otherAccountsReceivable,
        "Deferrals": deferrals,
        "Financial Assets Held for Trading": financialAssets,
        "Other Financial Assets": otherFinancialAssets,
        "Non-Current Assets Held for Sale": nonCurrentAssetsHeldForSale,
        "Other Current Assets": otherCurrentAssets,
        "Cash and Bank Deposits": cashAndBankDeposits,
        "Sum": sum2,
    }

    const assets = {
        "Non Current Assets": nonCurrentAssets,
        "Current Assets": currentAssets,
        "Total Assets": totalAssets,
    };

    // Liabilities

    const nonCurrentLiabilities = {
        "Provisions": provisions,
        "Financing Obtained": financingObtained,
        "Responsibilities for Post-Employment Benefits": responsabilities,
        "Deferred Tax Liabilities": deferredTaxLiabilities,
        "Accounts Payable": accountsPayable,
        "Sum": sum3,
    }

    const currentLiabilities = {
        "Suppliers": suppliers,
        "Client Advances": clientAdvances,
        "Government and Other Public Entities": governmentAndOtherPublic,
        "Financing Obtained": financingObtained2,
        "Other Accounts Payable": otherAccountsPayable,
        "Deferrals": deferrals2,
        "Financial Liabilities Held for Trading": financialLiabilities,
        "Other Financial Liabilities": otherFinancialLiabilities,
        "Non-Current Liabilities Held for Sale": nonCurrentLiabilitiesHeldForSale,
        "Other Current Liabilities": otherCurrentLiabilities,
        "Sum": sum4,
    }

    const liabilities = {
        "Non Current Liabilities": nonCurrentLiabilities,
        "Current Liabilities": currentLiabilities,
        "Total Liabilities": totalLiabilities,
    }

    // Equity

    const eq = {
        "Subscribed Capital": subscribedCapital,
        "Shares": shares,
        "Other Equity Instruments": otherEquityInstruments,
        "Issue Premiums": issuePremiums,
        "Legal Reserves": legalReserves,
        "Other Reserves": otherReserves,
        "Transited Results": transitedResults,
        "Revaluation Surpluses": revaluationSurpluses,
        "Adjustments/Other Changes in Equity": adjustments,
        "Net Income for the Period": netIncome,
        "Anticipated Dividends": anticipatedDividends,
    }

    const equity = {
        "Equity": eq,
        "Total Equity": "?",
    }

    // creates response
    response
        .status(200)
        .send({
            error: false,
            "Income and Expenses": incomeAndExpenses,
            "Assets": assets,
            "Liabilities": liabilities,
            "Equity": equity,
        });
}

async function resultsDemonstration(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}





export default router;
