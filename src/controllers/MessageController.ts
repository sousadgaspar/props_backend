import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Message} from '../entity/Message';
import {Celebrity} from '../entity/Celebrity';
import {User} from '../entity/User';
import {Ocasion} from '../entity/Ocasion';
import { validationResult } from 'express-validator';

class MessageController { 

    async create(request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors});
        }

        let message = new Message();
        let messageRepository = getRepository(Message);
        let celebrityRepository = getRepository(Celebrity);
        let userRepository = getRepository(User);
        let ocasionRepository = getRepository(Ocasion);

        let foundUser = Object();
        await userRepository.findOne({id: request.body.userId})
            .then(user => foundUser = user)
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            });
        message.user = foundUser;

        let foundCelebrity = Object();
        await celebrityRepository.findOne({id: request.body.celebrityId})
            .then(celebrity => {
                foundCelebrity = celebrity;
                message.price = foundCelebrity.messagePrice;
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            });
        message.celebrity = foundCelebrity;

        let foundOcasion = Object();
        await ocasionRepository.findOne({id: request.body.ocasionId})
            .then(ocasion => foundOcasion = ocasion)
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            });
        message.ocasion = foundOcasion;
        message.from = request.body.from;
        message.to = request.body.to;
        message.instructions = request.body.instructions;
        message.isPublic = request.body.isPublic;

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

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors});
        }

        let messageRepository = getRepository(Message);

        await messageRepository.findOne({id: request.params.id}, {relations: ["celebrity", "user", "ocasion"]})
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

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors});
        }

        let messageRepository = getRepository(Message);
        let ocasionRepository = getRepository(Ocasion);
        await messageRepository.findOne({id: request.params.id})
            .then(async foundMessage => {

                if(typeof foundMessage == 'undefined') {
                    response.status(403).send({
                        error: true,
                        message: "The message was not found"
                    })
                }

                foundMessage.from = request.body.from;
                foundMessage.to = request.body.to;
                foundMessage.status = request.body.status;
                foundMessage.instructions = request.body.instructions;
                foundMessage.video = request.body.video;

                let foundOcasion = Object();
                await ocasionRepository.findOne({id: request.body.ocasionId})
                    .then(ocasion => foundOcasion = ocasion)
                    .catch(error => {
                        response.status(500).send({
                            errorName: error.name,
                            errorMessage: error.message,
                            errorNumber: error.errno,
                            errorCode: error.code,
                            sqlMessage: error.sqlMessage,
                        })
                    });
                foundMessage.ocasion = foundOcasion;
                
                await messageRepository.save(foundMessage)
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
                    })
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

    async delete(request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors});
        }

        let messageRepository = getRepository(Message);
        await messageRepository.delete({id: request.params.id})
            .then(result => {
                response.status(200).send(result);
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

    async softDelete(request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors});
        }

        let messageRepository = getRepository(Message);
        await messageRepository.softDelete({id: request.params.id})
            .then(result => {
                response.status(200).send(result);
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

    async changeStatus(request: Request, response: Response) {
        let messageRepository = getRepository(Message);
        await messageRepository.findOne({id: request.params.id})
            .then(async foundMessage => {
                foundMessage.status = request.body.status;

                await messageRepository.save(foundMessage)
                    .then(savedMessage => {
                        response.status(200).send(savedMessage.status);
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
            })
    }

}

export let messageController = new MessageController();