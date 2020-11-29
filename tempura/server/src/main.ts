import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import { User } from "./entity/User";
import { root } from "./path";
import router from "./routes";
import { Saft } from "./entity/Saft";
import cors from "cors";
import morgan from "morgan";

const options: ConnectionOptions = {
    type: "sqlite",
    database: `${root}/database/tempura.db`,
    entities: [ User, Saft ],
    logging: true,
    synchronize: true,
}

createConnection(options)
    .then(async connection => {

        // create express app
        const app = express();
        
        // setup express app here
        // ...


        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(router);
        app.use(cors());
        app.use(morgan('dev'));


        // start express server
        app.listen(8000);
    })
    .catch((error) => {
        console.error(error)
    });
