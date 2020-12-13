import express, { NextFunction, Request, Response } from "express";

import asyncMiddleware from '../middlewares/asyncMiddleware';
import authMiddleware from '../middlewares/authMiddleware';



import fs from "fs";
import { getLineTotal, getAssets, getLiabilities, getAccountTotal, getTaxonomyTotal } from "../lib/financial";
import { getSaftFiles } from "../lib/saft";
import { TaxAccountingBasis } from "../entity/Saft";


const router = express.Router();

router.get('/balance_sheet', authMiddleware, asyncMiddleware(balanceSheet));
router.get('/results_demonstration', authMiddleware, asyncMiddleware(resultsDemonstration));

async function balanceSheet(request: Request, response: Response, next: NextFunction) {

    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user param to query
    const safts = await getSaftFiles(TaxAccountingBasis.ACCOUNTING, start, end);

    // balance sheet fields

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

        // ----------------------------------- gets "Non Current Assets" ------------------------------------

        // Tangible Fixed Assets.
        tangibleFixedAssets = Math.round(getAssets(json,
            ["268","269","270","271","272","273", "274", "306", "310"],
            ["275","276","277","278","279","280","281","282","283","284","285","286","287","288", "314", "318"]
        ) * 100) / 100;

        // Investment Properties
        investmentProperties = Math.round(getAssets(json,
            ["259","260","261","305","309"],
            ["262","263","264","265","266","267","313","317"]
        ) * 100) / 100;

        // Goodwill
        goodwill = Math.round(getAssets(json,
            ["217","222","227","289"],
            ["236","237","238","240","245","250","294","299"]
        )* 100) / 100;

        // Intagible Assets
        intangibleAssets = Math.round(getAssets(json,
            ["290","291","292","293","307","311"],
            ["295","296","297","298","300","301","302","303","315","319"]
        )* 100) / 100;

        // Biological Assets
        biologicalAssets = Math.round(getAssets(json,
            ["197","198","215"],
            ["200","202"]
        ) * 100) / 100;

        // Financial Holdings
        financialHoldings = Math.round(getAssets(json,
            ["216","221","226"],
            ["239","244","249"]
        ) * 100) / 100;

        // Other Financial Investments
        otherFinancialInvestments = Math.round(getAssets(json,
            ["218","219","220","223","224","225","228","229","230","231","232","233","234","304","308"],
            ["235","241","242","243","246","247","248","251","252","253","254","255","256","257","258","312","316"]
        ) * 100) / 100;

        // Accounts Receivable
        accountsReceivable = Math.round(getAssets(json,
            ["62","64", "112","114","125","127","129","139"],
            ["68","70","121","123","141","145"]
        ) * 100) / 100;

        // Deferred Tax Assets
        deferredTaxAssets = Math.round(getAssets(json,
            ["133"],
            ["143"]
        ) * 100) / 100;

        // Financial Investments
        financialInvestments = 0;

        // Credits and Other Non-Current Assets
        creditsAndOther = 0;

        sum = Math.round((tangibleFixedAssets + investmentProperties + goodwill + intangibleAssets + biologicalAssets + financialHoldings + otherFinancialInvestments + accountsReceivable + deferredTaxAssets + financialInvestments + creditsAndOther) * 100) / 100;

        // ----------------------------------- gets "Current Assets" ------------------------------------

        // Inventory
        inventory = Math.round(getAssets(json,
            ["165", "166", "167", "171", "172", "173", "174", "175", "176", "183", "184", "187", "188", "189", "193", "209", "210", "211", "212", "213"],
            ["168", "169", "170", "177", "178", "179", "180", "181", "182", "185", "186", "190", "191", "192", "194"]
        ) * 100) / 100;

        // Biological Assets
        biologicalAssets2 = Math.round(getAssets(json,
            ["195", "196", "214"],
            ["199","201"]
        ) * 100) / 100;

        // Clients
        clients = Math.round(getAssets(json,
            ["10","11","12","13","14","15","16","17","18","19","20","21"],
            ["22","24","25","26","27","28","29","30","31","32","33","34","35","36"]
        ) * 100) / 100;

        // Government and Other Public Entities
        governmentAndOther = Math.round(getAssets(json,
            ["71","73","74","76","77","79","80","81","82","83","84","85"],
            []
        ) * 100) / 100;

        // Subscribed and Unpaid Capital
        subscribedAndUnpaidCapital = Math.round(getAssets(json,
            ["106","107"],
            ["115","116"]
        ) * 100) / 100;

        // Other Accounts Receivable
        otherAccountsReceivable = Math.round(getAssets(json,
            ["37","38","39","40","41","42","43","44","45","46","47","48","49","50","55","56","61","63","108","109","110","111","113","124","126","128","130","138"],
            ["51","52","65","66","67","69","117","118","119","120","122","140","142","144"]
        ) * 100) / 100;

        // Deferrals
        deferrals = Math.round(getAssets(json,
            ["146"],
            []
        ) * 100) / 100;

        // Financial Assets Held for Trading
        financialAssets = Math.round(getAssets(json,
            ["4", "6"],
            []
        ) * 100) / 100;

        // Other Financial Assets
        otherFinancialAssets = Math.round(getAssets(json,
            ["8"],
            []
        ) * 100) / 100;

        // Non-Current Assets Held for Sale
        nonCurrentAssetsHeldForSale = Math.round(getAssets(json,
            ["320","321","322","323","324"],
            ["326","327","328","329","330"]
        ) * 100) / 100;

        // Other Current Assets
        otherCurrentAssets = 0;

        // Cash and Bank Deposits
        cashAndBankDeposits = Math.round(getAssets(json,
            ["1", "2", "3"],
            []
        ) * 100) / 100;

        // Sum
        sum2 = Math.round((inventory + biologicalAssets2 + clients + governmentAndOther + subscribedAndUnpaidCapital + otherAccountsReceivable + deferrals + financialAssets + otherFinancialAssets + nonCurrentAssetsHeldForSale + otherCurrentAssets + cashAndBankDeposits) * 100) / 100;

        totalAssets = Math.round((sum + sum2) * 100) / 100;

        // ----------------------------------- gets "Non Current Liabilities" ------------------------------------

        // Provisions
        provisions = Math.round(getLiabilities(json,
            ["148","149","150","151","152","153","154","155"],
            []
        ) * 100) / 100;

        // Financing Obtained
        financingObtained = Math.round(getLiabilities(json,
            ["87","89","91","93","95","97","99","101","103","105"],
            []
        ) * 100) / 100;

        // Responsibilities for Post-Employment Benefits
        responsabilities = Math.round(getLiabilities(json,
            ["132"],
            []
        ) * 100) / 100;

        // Deferred Tax Liabilities
        deferredTaxLiabilities = Math.round(getLiabilities(json,
            ["134"],
            []
        ) * 100) / 100;

        // Accounts Payable
        accountsPayable = Math.round(getLiabilities(json,
            ["58","60","62","64","114","125","127","136","139"],
            []
        ) * 100) / 100;

        // Sum
        sum3 = Math.round((provisions + financingObtained + responsabilities + deferredTaxLiabilities + accountsPayable) * 100) / 100;

        // ----------------------------------- gets "Current Liabilities" ------------------------------------

        // Suppliers
        suppliers = Math.round(getLiabilities(json,
            ["37","38","39","40","41","42","43","44","45","46","47","48","49","50"],
            []
        ) * 100) / 100;

        // Client Advances
        clientAdvances = Math.round(getLiabilities(json,
            ["10","11","12","13","14","15","16","17","18","19","20","21","22","23","137"],
            []
        ) * 100) / 100;

        // Government and Other Public Entities
        governmentAndOtherPublic = Math.round(getLiabilities(json,
            ["71","72","75","76","77","78","81","82","83","84","85"],
            []
        ) * 100) / 100;

        // Financing Obtained
        financingObtained2 = Math.round(getLiabilities(json,
            ["2","3","86","88","90","92","94","96","98","100","102","104"],
            []
        ) * 100) / 100;

        // Other Accounts Payable
        otherAccountsPayable = Math.round(getLiabilities(json,
            ["53","54","57","59","61","63","109","110","113","124","126","131","135","138"],
            []
        ) * 100) / 100;

        // Deferrals
        deferrals2 = Math.round(getLiabilities(json,
            ["147"],
            []
        ) * 100) / 100;

        // Financial Liabilities Held for Trading
        financialLiabilities = Math.round(getLiabilities(json,
            ["5", "7"],
            []
        ) * 100) / 100;

        // Other Financial Liabilities
        otherFinancialLiabilities = Math.round(getLiabilities(json,
            ["9"],
            []
        ) * 100) / 100;

        // Non-Current Liabilities Held for Sale
        nonCurrentLiabilitiesHeldForSale = Math.round(getLiabilities(json,
            ["325"],
            []
        ) * 100) / 100;

        // Other Current Liabilities
        otherCurrentLiabilities = 0;

        // Sum
        sum4 = Math.round((suppliers + clientAdvances + governmentAndOtherPublic + financingObtained2 + otherAccountsPayable + deferrals2 + financialLiabilities + otherFinancialLiabilities + nonCurrentLiabilitiesHeldForSale + otherCurrentLiabilities) * 100) / 100;

        totalLiabilities = Math.round((sum3 + sum4) * 100) / 100;

        // ----------------------------------- gets "Equity" ------------------------------------

        // Subscribed Capital
        subscribedCapital = Math.round(getLiabilities(json,
            ["331"],
            []
        ) * 100) / 100;

        // Shares
        shares = Math.round(getLiabilities(json,
            ["333"],
            ["332"]
        ) * 100) / 100;

        // Other Equity Instruments
        otherEquityInstruments = Math.round(getLiabilities(json,
            ["334"],
            []
        ) * 100) / 100;

        // Issue Premiums
        issuePremiums = Math.round(getLiabilities(json,
            ["335"],
            []
        ) * 100) / 100;

        // Legal Reserves
        legalReserves = Math.round(getLiabilities(json,
            ["336"],
            []
        ) * 100) / 100;

        // Other Reserves
        otherReserves = Math.round(getLiabilities(json,
            ["337"],
            []
        ) * 100) / 100;

        // Transited Results
        transitedResults = Math.round(getLiabilities(json,
            ["338"],
            []
        ) * 100) / 100;

        // Revaluation Surpluses
        revaluationSurpluses = Math.round(getLiabilities(json,
            ["343","345"],
            ["344","346"]
        ) * 100) / 100;

        // Adjustments/Other Changes in Equity
        adjustments = Math.round(getLiabilities(json,
            ["339","340","341","342","347","348","349","351","352"],
            ["350"]
        ) * 100) / 100;

        // Net Income for the Period
        netIncome = Math.round(getLiabilities(json,
            ["646"],
            []
        ) * 100) / 100;

        // Anticipated Dividends
        anticipatedDividends = Math.round(getLiabilities(json,
            [],
            ["647"]
        ) * 100) / 100;

        // Total Equity
        totalEquity = Math.round((subscribedCapital + shares + otherEquityInstruments + issuePremiums + legalReserves + otherReserves + transitedResults + revaluationSurpluses + adjustments + netIncome + anticipatedDividends) * 100) / 100; 

        // SAFT CHECK
        const check = totalAssets - (totalEquity + totalLiabilities);
        console.log("CHECK RESULTS: ", check);
    });

    // ----------------------------------- JSON Response ------------------------------------

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
        "Total Equity": totalEquity,
    }

    // creates response
    return response
        .status(200)
        .json({
            error: false,
            "Assets": assets,
            "Liabilities": liabilities,
            "Equity": equity,
        });

}

async function resultsDemonstration(request: Request, response: Response, next: NextFunction) {
    
    const start = request.query.start_date;
    const end = request.query.end_date;

    // TODO: add user param to query
    const safts = await getSaftFiles(TaxAccountingBasis.ACCOUNTING, start, end);

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

     // iterates through SAFT
     safts.forEach(saft => {
        console.log(saft.path);

        const json = JSON.parse(fs.readFileSync(saft.path).toString());
        
        // -------------------------------------- "Income and Expenses" ---------------------------------------
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

    });

    // ----------------------------------- JSON Response ------------------------------------

    // "Income and Expenses"
    const incomeAndExpenses = {
        "Sales and Services": codeOne,
        "Operating Subsidies": codeTwo,
        "Imputed Gains/Losses of Subsidiaries, Associates and Joint Ventures": codeThree,
        "Variation in Production Inventories": codeFour,
        "Work for Own Entity": codeFive,
        "Cost of Goods Sold and Materials Consumed": codeSix,
        "Supplies and External Services": codeSeven,
        "Personnel Expenses": codeEight,
        "Impairment (Losses/Reversals)": codeNine,
        "Impairment/Inventory Adjustments (Losses/Reversals)": codeTen,
        "Impairment of Accounts Receivable (Losses/Reversals)": codeEleven,
        "Provisions (Increases/Decreases)": codeTwelve,
        "Impairment of Non-Depreciable/Amortizable Investments (Losses/Reversals)": codeThirteen,
        "Other Impairments (Losses/Reversals)": codeFourteen,
        "Fair Value Increases/Decreases": codeFifteen,
        "Other Income": codeSixteen,
        "Other Expenses": codeSeventeen,
        "Income Before Depreciation, Financing Expenses and Taxes": codeEighteen,
        "Depreciation and Amortization Expenses/Reversals": codeNineteen,
        "Impairment of Depreciable/Amortizable Investments (Losses/Reversals)": codeTwenty,
        "Operating Income (Before Financing Expenses and taxes)": codeTwentyOne,
        "Interest and Similar Income Obtained": codeTwentyTwo,
        "Interest and Similar Expenses Incurred": codeTwentyThree,
        "Income Before Taxes": codeTwentyFour,
        "Tax Over the Period's Income": codeTwentyFive,
        "Net Income for the Period": codeTwentySix,
        "Result of Discontinued Activities (Net of Taxes) Included in Net Income for the Period": codeTwentySeven
    };

    // creates response
    return response
        .status(200)
        .json({
            error: false,
            "Income and Expenses": incomeAndExpenses,
        });

}

export default router;
