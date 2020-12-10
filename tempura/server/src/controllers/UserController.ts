import express, { Request, Response } from 'express';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.get('/auth-test', authMiddleware, authTest);

async function register(request: Request, response: Response) {
    
    const repository = getRepository(User);
    
    const { username, password } = request.body;

    const userExists = await repository.findOne({where: { username } });

    if(userExists) {
        response.status(400);
        response.json("User already exists.").send();
    }

    const user = repository.create({username, password});
    await repository.save(user);

    response.status(200);
    response.json(user).send();

}

async function authTest(request: Request, response: Response) {
    
    response.status(200);
    response.json("Only logged in users can see this information").send();

}



export default router;