import HttpException from '../exceptions/HttpException';
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


    console.log(request.headers);
    // fails to get authorization
    if(!authorization){
        return next(new HttpException(401, "error: You need to be logged in to access this information."))
    }

    if(authorization != null) {
        
        // gets secret token parameter
        const token = authorization.replace('Bearer', '').trim();
        
        try{

            // gets data from token
            // TODO: change secret and add to a .env file possibly
            const data = jwt.verify(token, process.env.TOKEN_SECRET ?? "secret");

            // gets user id from user
            const { id } = data as TokenPayload;
            
            request.user = id;
            // goes to next function
            return next();
    
        } catch(err) {
            return next(new HttpException(401,err))
        }

    }
    else {

        // authorization is null
        // response.status(401);
        // response.json("error: You need to be logged in to access this information.");
        return next(new HttpException(401, "error: You need to be logged in to access this information."))
    }

}