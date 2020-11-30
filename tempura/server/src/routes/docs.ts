import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { root } from "../path";


const PORT = process.env.PORT || 8000

const swaggerDoc = YAML.load(`${root}/docs/api.yml`);
const swaggerDef = {
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: "Development Server"
        }
    ]
}
const options = {
    swaggerDef,
    customCss: '.swagger-ui .topbar { display: none }'
    // explorer: true
};


const router = express.Router();

router.use('/docs', swaggerUI.serve);
router.get('/docs', swaggerUI.setup(swaggerDoc, options));


export default router;