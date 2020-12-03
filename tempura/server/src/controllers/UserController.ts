import express, { Request, Response } from 'express';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

const router = express.Router();

router.post('/get-user', getUser);

async function getUser(request: Request, response: Response) {
    
    const repository = getRepository(User);
    
    const { username } = request.body;

    const user = await repository.findOne({where: { username } });

    if(!user) {
        response.status(404);
        response.send("User was not found.")
    }

    response.status(200);
    response.send(user);

}



export default router;