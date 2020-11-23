import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Message} from '../entity/Message';
import {Celebrity} from '../entity/Celebrity';

class MessageController { 

    async create(request: Request, response: Response) {
        let message = new Message();
        let messageRepository = getRepository(Message);
        let celebrityRepository = getRepository(Celebrity);

        message.userId = request.body.userId;
        message.celebrityId = request.body.celebrityId;
        message.ocasionId = request.body.ocasionId;
        message.from = request.body.from;
        message.to = request.body.to;
        message.instructions = request.body.instructions;

        //find the message price from the celebrity profile
        await celebrityRepository.findOne({id: request.body.celebrityId})
            .then(foundCelebrity => {
                message.price = foundCelebrity.messagePrice;
            })
            .catch(error => {
                response.status(500).send({
                    error: "falha ao retornar o preco da mensagem apartir dos dados do artista.",
                    detailedError: error
                })
            })


        await messageRepository.save(message)
            .then(savedMessage => {
                response.status(200).send(savedMessage);
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                });
            });
    }

    async index(request: Request, response: Response) {
        let messageRepository = getRepository(Message);
        await messageRepository.find()
            .then(collection => {
                response.status(200).send(collection);
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                });
            })
    }

    async show(request: Request, response: Response) {
        let message = new Message();
        let messageRepository = getRepository(Message);

        await messageRepository.findOne({id: request.params.id})
            .then(foundMessage => {
                response.status(200).send(foundMessage);
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                });
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