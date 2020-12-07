import express, { NextFunction, Request, Response } from "express";
import { User } from '../entity/User';
import { getRepository } from 'typeorm';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { maxHeaderSize } from "http";

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
        response.status(401);
        response.json("Invalid username or password!").send();
    }

    if(user != undefined){

        // compares password
        const isValidPassword = await bcrypt.compare(password, user.password);

        // fails to provide correct password
        if(!isValidPassword){
            response.status(401);
            response.json("Invalid username or password!").send();
        }

        // creates token
        // TODO : change secret and add to a .env file possibly
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '4h' });

        // logs in succesfully
        response.status(200);
        response.json({
            username,
            token
        }).send();

    } 
    else {

        response.status(401);
        response.json("Invalid username or password!").send();

    }

}

function logout(request: Request, response: Response, next: NextFunction) {
    // TODO: implement this endpoint
    response.send('NOT IMPLEMENTED');
}


export default router;
