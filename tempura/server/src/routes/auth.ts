import express, { NextFunction, Request, Response } from "express";
import { User } from '../entity/User';
import { getRepository } from 'typeorm';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import HttpException from "../exceptions/HttpException";

const router = express.Router();


router.post('/login', login);
router.post('/logout', logout);


async function login(request: Request, response: Response, next: NextFunction) {

    // connects to User's table
    const repository = getRepository(User);

    // gets request parameters
    const { username, password } = request.body;

    // gets desired user
    const user = await repository.findOne({where: { username } });

    // fails to get desired user
    if(!user){
        return next(new HttpException(401, "Invalid username or password."));
    }

    if(user != undefined){

        // compares password
        const isValidPassword = await bcrypt.compare(password, user.password);

        // fails to provide correct password
        if(!isValidPassword){
            return next(new HttpException(401, "Invalid username or password."));
        }

        let secret = process.env.TOKEN_SECRET ?? 'secret';

        // creates token
        const token = jwt.sign({ id: user.id }, secret , { expiresIn: '4h' });

        // logs in succesfully
        response.status(200);
        response.json({
            username,
            token
        }).send();

    } 
    else {
        return next(new HttpException(401, "Invalid username or password."));
    }

}

function logout(request: Request, response: Response, next: NextFunction) {
    response.send('NOT IMPLEMENTED');
}


export default router;
