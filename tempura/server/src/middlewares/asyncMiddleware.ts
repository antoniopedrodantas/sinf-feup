import { Request, Response, NextFunction } from "express";

function asyncMiddleware(callback: Function) {
    return function (request: Request, response: Response, next: NextFunction) {
        callback(request, response, next)
            .catch(next)
    }
}

export default asyncMiddleware;
