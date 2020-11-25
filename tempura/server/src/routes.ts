import express from "express";

import client from "./routes/client";
import product from "./routes/product";
import supplier from "./routes/supplier";
import miscellaneous from "./routes/misc";


const router = express.Router();


router.use('/client', client);
router.use('/product', product);
router.use('/supplier', supplier);
router.use('/', miscellaneous);


export default router;
