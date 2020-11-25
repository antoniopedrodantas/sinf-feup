import express from "express";

import client from "./routes/client";
import product from "./routes/product";
import supplier from "./routes/supplier";

import stock from "./routes/stock";
import financial from "./routes/financial";
import miscellaneous from "./routes/misc";


const router = express.Router();


router.use('/client', client);
router.use('/product', product);
router.use('/supplier', supplier);

router.use('/', stock);
router.use('/', financial);
router.use('/', miscellaneous);


export default router;
