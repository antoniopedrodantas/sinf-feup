import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import { User } from "./entity/User";
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
        
        app.use(function (req, res, next) {
            
            /*var err = new Error('Not Found');
            err.status = 404;
            next(err);*/
            
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
            
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
            
            //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            
            // Pass to next layer of middleware
            next();
            
        });

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
