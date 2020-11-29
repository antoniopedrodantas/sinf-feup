import express from "express";

import auth from "./routes/auth";

import client from "./routes/client";
import product from "./routes/product";
import supplier from "./routes/supplier";

import stock from "./routes/stock";
import sales from "./routes/sales";
import overview from "./routes/overview";
import purchases from "./routes/purchases";
import financial from "./routes/financial";
import miscellaneous from "./routes/miscellaneous";


const router = express.Router();


router.use('/', auth);
router.use('/',);

router.use('/client', client);
router.use('/product', product);
router.use('/supplier', supplier);

router.use('/', stock);
router.use('/', sales);
router.use('/', overview);
router.use('/', purchases);
router.use('/', financial);
router.use('/', miscellaneous);


export default router;
