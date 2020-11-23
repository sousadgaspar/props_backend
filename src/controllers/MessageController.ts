import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Message} from '../entity/Message';

class MessageController { 

    async create(request: Request, response: Response) {

    }

    async index(request: Request, response: Response) {
        
    }

    async show(request: Request, response: Response) {
        response.send({
            instructions: "Hi, Me and Dumilda are very fans of yours. Unfortunatelly I betrayed her. Please, record a message telling her I love her so much, and I never going to meet any other woman again.",
            createdAt: Date(),
            updatedAt: Date(),
        })
    }

    async update(request: Request, response: Response) {
        response.send({
            id: request.params.id,
            from: request.body.from,
            to: request.body.to,
            ocasionId: request.body.ocasionId,
            instructions: request.body.instructions,
        });
    }

    async delete(request: Request, response: Response) {
        
    }

    async softDelete(request: Request, response: Response) {
        
    }

}

export let messageController = new MessageController();