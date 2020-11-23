import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import { User } from "./entity/User";
import { root } from "./path";
import router from "./routes";

const options: ConnectionOptions = {
    type: "sqlite",
    database: `${root}/database/tempura.db`,
    entities: [ User ],
    logging: true
}

createConnection(options)
    .then(async connection => {

        // create express app
        const app = express();
        app.use(bodyParser.json());

        // setup express app here
        // ...

        app.use(router);

        // start express server
        app.listen(3000);

        app.get("/", (req, res) => {
            res.send("Hello World")
        })

        console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results");

    })
    .catch((error) => {
        console.error(error)
    });
