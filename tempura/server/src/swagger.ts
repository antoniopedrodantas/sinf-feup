import { root } from "./path";
import swaggerJSDoc from "swagger-jsdoc";


const PORT = process.env.PORT || 8000

const swaggerDefinition = {
    openapi: "3.0.2",
    info: {
        title: "TempuraAPI",
        description: "Get helpful statistics about your company's performance",
        version: "1.0.0"
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: "Development Server"
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: [`${root}/src/routes/*.ts`]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;