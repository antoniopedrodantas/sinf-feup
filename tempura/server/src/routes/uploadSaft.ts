import express, { NextFunction, Request, Response } from "express";
import { writeFile } from "fs";
import multer, { MulterError } from "multer";
import { root } from "../path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //TODO check if dir exists
    cb(null, `${root}/safts/`)
  },
  filename: (req, file, cb) => {
    // TODO add name scheme or name generator
    cb(null, file.originalname);
  }
})

const filefilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype != 'application/xml') {
    cb(new Error('Wrong file type.'))
  } else { // TODO: add validacao xsd aqui 
    cb(null, true);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: filefilter,
}).single('saft');

// TODO: Auth middleware
router.post('/upload',uploadfile);


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
        // TODO adicionar a db
        response.status(200).send({
          error: false,
          message: 'Saft was uploaded successfuly!'
        });
      }
  });
}



export default router;