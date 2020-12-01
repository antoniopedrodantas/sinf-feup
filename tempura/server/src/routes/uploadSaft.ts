import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { root } from "../path";
// import libxml from "libxmljs";
import fs from "fs";
import parser from "xml2json";
import { JsonObject } from "swagger-ui-express";


import { getRepository } from "typeorm";
import { Saft } from "../entity/Saft";


const router = express.Router();

const xsdPath = `${root}/safts/saftpt1.04_01.xsd`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${root}/safts/tmp/`);
  },
  filename: (req, file, cb) => {
    // TODO add name scheme or name generator
    cb(null, file.originalname);
  }
})


const filefilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype != 'application/xml') {
    cb(new Error('Wrong file type.'))
  } else {
    // TODO: add validacao xsd aqui 
    // commented code is here for when we get back to this

    // console.log(file.buffer);
    // const xmlDoc = libxml.parseXml((file.buffer).toString());
    // const xsdDoc = libxml.parseXml(fs.readFileSync(xsdPath).toString());

    // if (xmlDoc.validate(xsdDoc)) {
    //   console.log('valid xml');
    //   cb(null, true);
    // } else {
    //   console.log('not a valid xml');
    //   cb(new Error('Not a valid SAFT-PT file.'));
    // }

    cb(null, true)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: filefilter,
}).single('saft');

// TODO: Auth middleware
router.post('/upload', uploadfile);



function uploadfile(request: Request, response: Response, next: NextFunction) {
  upload(request, response, (error: any) => {
    if (error instanceof Error) {
      response.status(400).send({
        error: true,
        message: error.message
      });
    } else if (error) {
      response.status(500)
    } else {

      // xml to json
      console.log(request.file.filename);
      const xmlData = fs.readFileSync(`${root}/safts/tmp/${request.file.filename}`);
      let jsonObj = JSON.parse(parser.toJson(xmlData));

      // delete tmp file
      fs.unlinkSync(`${root}/safts/tmp/${request.file.filename}`);

      // remove header from json
      jsonObj = jsonObj["AuditFile"];
      let header = jsonObj["Header"];

      // get header info
      // TODO: come up with some sort of naming scheme
      let fileName = "test.json"; // FIXME: this is temporary

      // get header information
      const saftHeaderInfo: SaftHeader = {
        name: fileName,
        creationDate: header.DateCreated,
        startDate: header.StartDate,
        endDate: header.EndDate,
        fiscalYear: header.FiscalYear,
        type: header.TaxAccountingBasis,
        path: `${root}/safts/${fileName}`
      }
      console.log(saftHeaderInfo);

      // TODO: check if file overlaps with any already in the db
      // TODO: insert file entry into db with above information

      // TODO: modify json schema, to make more accessible (may depends on saft type)

      // remove header
      delete jsonObj["Header"];

      // convert GeneralLedgerAccounts
      let accounts = convertGeneralLedgerAccounts(jsonObj["MasterFiles"]["GeneralLedgerAccounts"]);
      jsonObj["MasterFiles"]["GeneralLedgerAccounts"] = accounts;


      if (saftHeaderInfo.type === 'C') {
        // accountability

        // only need the accounts ?
      } else if (saftHeaderInfo.type === 'F') {
        // billing

      } else {
        // TODO: throw error SAFT type not supported

      }




      fs.writeFileSync(saftHeaderInfo.path, JSON.stringify(jsonObj));

      response.status(200).send({
        error: false,
        message: 'Saft was uploaded successfuly!'
      });
    }
  });
}

function convertGeneralLedgerAccounts(old: JsonObject) {
  let taxonomyCodes: JsonObject = {};
  let accounts: JsonObject = {};

  let oldAccounts: Array<JsonObject> = old["Account"];
  oldAccounts.forEach(element => {
    let id = element["AccountID"];

    delete element["AccountID"]
    let info = element;

    if (info.hasOwnProperty('TaxonomyCode')) {
      let code = info["TaxonomyCode"];
      delete info["TaxonomyCode"];

      if (taxonomyCodes.hasOwnProperty(code)) {
        taxonomyCodes[code].push(id);
      } else {
        taxonomyCodes[code] = [id];
      }
    }

    accounts[id] = info;
  });

  return {
    "TaxonomyReference": `${old["TaxonomyReference"]}`,
    "TaxonomyCodes": taxonomyCodes,
    "Accounts": accounts
  };
}


interface SaftHeader {
  name: string,
  creationDate: string,
  startDate: string,
  endDate: string,
  fiscalYear: string,
  type: string,
  path: string
};

// possible scenarios
//  - overlaps, but the file is newer -> delete old file (disk and db) and insert new
//  - overlaps, but the file is older -> keep old file and send error explaining the situation
//  - overlaps, but the file is a different type -> insert new file
//  - no overlap -> insert new file

function checkOverlapping(info: SaftHeader) {
  // how can a file completly overlap another?
  //  - same start and end date 
}

function insertSaft(info: SaftHeader) {

}


export default router;