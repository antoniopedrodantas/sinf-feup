import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import { User } from "./entity/User";
import { root } from "./path";
import router from "./routes";
import { Saft } from "./entity/Saft";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

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
        app.use(bodyParser.json());

        // setup express app here
        // ...

        const swaggerDefinition = {
            openapi: "3.0.2",
            info: {
                title: "TempuraAPI",
                description: "Get helpful statistics about your company's performance",
                version: "1.0.0"
            },
            servers: [
                {
                    url: "http://localhost:3000",
                    description: "Development Server"
                },
            ],
        };

        const options = {
            swaggerDefinition,
            apis: ['./routes/*.ts']
        };

        const swaggerSpec = swaggerJSDoc(options);


        app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
        app.use(router);

        // start express server
        app.listen(3000);

    })
    .catch((error) => {
        console.error(error)
    });
