import "reflect-metadata";
import { ConnectionOptions, createConnection, getRepository } from "typeorm";
import express, { NextFunction, response } from "express";
import * as bodyParser from "body-parser";
import { User } from "./entity/User";
import { root } from "./path";
import router from "./routes";
import { Saft } from "./entity/Saft";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import dotenv, { DotenvConfigOptions } from 'dotenv';

import errorMiddleware from "./middlewares/errorMiddleware";
import JasminRequester from "./lib/JasminRequester";


const options: ConnectionOptions = {
    type: "sqlite",
    database: `${root}/database/tempura.db`,
    entities: [User, Saft],
    logging: true,
    synchronize: true,
}

const corsOptions = {
    "origin": "http://localhost:3000",
    "methods": ["GET","PUT","POST","DELETE"],
    "preflightContinue": false,
    "credentials": true,
    "optionsSuccessStatus": 200
}


createConnection(options)
    .then(async connection => {
        const dotenvOptions: DotenvConfigOptions = {
            path: `${root}/.env`
        }
        dotenv.config(dotenvOptions);



        // create express app
        const app = express();

        // setup express app here
        // ...

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(cors(corsOptions));
        app.use(morgan('dev'));

        // ...

        app.use(router);

        console.log("Express server has started on port 8000. Open http://localhost:8000/ to see results");


        app.use(errorMiddleware);

        // start express server
        app.listen(8000);


    })
    .catch((error) => {
        console.error(error)
    });
