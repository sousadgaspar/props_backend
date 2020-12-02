import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Celebrity} from '../entity/Celebrity';
import { validationResult } from 'express-validator';

class CelebrityController { 

    async create(request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }

        let celebrity = new Celebrity();
        let celebrityRepository = getRepository(Celebrity);
        celebrity.firstName = request.body.firstName;
        celebrity.lastName = request.body.lastName;
        celebrity.nickName = request.body.nickName;
        celebrity.avatar = request.body.avatar;
        celebrity.categoryId = request.body.categoryId;
        celebrity.subcategoryId = request.body.subcategoryId;
        celebrity.description = request.body.description;
        celebrity.email = request.body.email;
        celebrity.password = request.body.password;
        celebrity.messagePrice = request.body.messagePrice;
        celebrity.messagePriceCurrency = request.body.messagePriceCurrency;
        celebrity.messageResponseTime = request.body.messageResponseTime;

        await celebrityRepository.save(celebrity)
            .then(value => {
                response.status(200).send(value)
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
        
        let celebrity = new Celebrity();
        let celebrityRepository = getRepository(Celebrity);

        await celebrityRepository.find(celebrity)
            .then(value => {
                response.status(200).send(value);
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
        
        //validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors.array()})
        }

        let celebrityRepository = getRepository(Celebrity);
        await celebrityRepository.findOne({id: request.params.id})
            .then(value => {
                response.status(200).send(value);
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

    async update(request: Request, response: Response) {
        //validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).send({errors: errors.array()})
        }

        let celebrityRepository = getRepository(Celebrity);
        await celebrityRepository.findOne({id: request.params.id})
            .then(async foundCelebrity => {
                foundCelebrity.firstName = request.body.firstName;
                foundCelebrity.lastName = request.body.lastName;
                foundCelebrity.nickName = request.body.nickName;
                foundCelebrity.avatar = request.body.avatar;
                foundCelebrity.password = request.body.password;
                foundCelebrity.categoryId = request.body.categoryId;
                foundCelebrity.subcategoryId = request.body.subcategoryId;
                foundCelebrity.description = request.body.description;
                foundCelebrity.messageResponseTime = request.body.messageResponseTime;
                foundCelebrity.messagePrice = request.body.messagePrice;
                foundCelebrity.messagePriceCurrency = request.body.messagePriceCurrency;
            
                await celebrityRepository.save(foundCelebrity)
                    .then(savedCelebrity => {
                        response.status(200).send(savedCelebrity);
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
            .catch()
    }

    async delete(request: Request, response: Response) {

        //validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()){
           return response.status(400).json({errors: errors.array()})
        }

        let celebrityRepository = getRepository(Celebrity);
        await celebrityRepository.delete({id: request.params.id})
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

        //validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors.array()})
        }

        let celebrityRepository = getRepository(Celebrity);
        await celebrityRepository.softDelete({id: request.params.id})
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

}

export let celebrityController = new CelebrityController();