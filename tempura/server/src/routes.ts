import express from "express";

import client from "./routes/client";
import supplier from "./routes/supplier"


const router = express.Router();


router.use('/client', client);
router.use('/supplier', supplier);


export default router;