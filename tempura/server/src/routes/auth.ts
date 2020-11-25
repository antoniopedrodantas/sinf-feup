import express, { NextFunction, Request, Response } from "express";

const router = express.Router();


router.post('/login', login);
router.post('/logout', logout);


function login(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}

function logout(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}


export default router;
