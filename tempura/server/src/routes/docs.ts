import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../swagger";


const router = express.Router();


router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


export default router;