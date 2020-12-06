import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import { User } from "./entity/User";
import { root } from "./path";
import router from "./routes";
import cors from "cors";
import morgan from "morgan";

const options: ConnectionOptions = {
    type: "sqlite",
    database: `${root}/database/tempura.db`,
    entities: [ User ],
    logging: true
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

        // create express app
        const app = express();
        app.use(bodyParser.json());

        // setup express app here
        // ...

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(cors(corsOptions));
        app.use(morgan('dev'));

        // ...

        app.use(router);

        // start express server
        app.listen(8000);

        app.get("/", (req, res) => {
            res.send("Hello World")
        })

        console.log("Express server has started on port 8000. Open http://localhost:8000/ to see results");

    })
    .catch((error) => {
        console.error(error)
    });
