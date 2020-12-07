import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {

    // checks for auth in request headers
    const { authorization } = request.headers;

    // fails to get authorization
    if(!authorization){
        response.status(401);
        response.json("error: You need to be logged in to access this information.");
    }

    if(authorization != null) {
        
        // gets secret token parameter
        const token = authorization.replace('Bearer', '').trim();
        
        try{

            // gets data from token
            // TODO: change secret and add to a .env file possibly
            const data = jwt.verify(token, 'secret');

            // gets user id from user
            const { id } = data as TokenPayload;

            // TODO: maybe do something with id later on

            // goes to next function
            return next();
    
        } catch(err) {
            response.status(401);
            response.json(err).send();
        }

    }
    else {

        // authorization is null
        response.status(401);
        response.json("error: You need to be logged in to access this information.");

    }

}