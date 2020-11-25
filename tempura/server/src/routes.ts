import express from "express";

import client from "./routes/client";
import product from "./routes/product";
import supplier from "./routes/supplier";


const router = express.Router();


router.use('/client', client);
router.use('/product', product);
router.use('/supplier', supplier);


export default router;
