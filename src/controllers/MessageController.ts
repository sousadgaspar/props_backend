import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Message} from '../entity/Message';
import {Celebrity} from '../entity/Celebrity';
import {User} from '../entity/User';
import {Ocasion} from '../entity/Ocasion';
import { validationResult } from 'express-validator';
import {Transaction} from '../entity/Transaction';
import {Account} from '../entity/Account';
import { Tenant } from '../entity/Tenant';


/*
*
* create: create a new Message register in the database
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function create(request: Request, response: Response) {
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
    const accountRepository = getRepository(Account);
    const transactionRepository = getRepository(Transaction);

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

    const foundCelebrity = await celebrityRepository.findOne({id: request.body.celebrityId});
    if(foundCelebrity == undefined) response.status(404).send({error: true, message: "celebrity not found during message creation"})

    message.price = foundCelebrity.messagePrice;
    message.currency = foundCelebrity.user.tenant.currency;
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


/*
*
* index: list all Message registers in the database
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function index(request: Request, response: Response) {
    let messageRepository = getRepository(Message);
    await messageRepository.find({relations: ["celebrity", "user"]})
        .then(messages => {
            response.status(200).send(messages);
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

export async function show(request: Request, response: Response) {

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


/*
*
* userMessage: list all Message registers in the database for a spacific user based on the database userId
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function userMessages(request: Request, response: Response) {

    //Validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors: errors});
    }

    let messageRepository = getRepository(Message);
    let userRepository = getRepository(User);
    let user = userRepository.findOne({id: request.params.id})

    await messageRepository.find({where: {user: user}})
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


/*
*
* update: update a specific register based on the database register id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function update(request: Request, response: Response) {

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

            if(request.body.from) foundMessage.from = request.body.from;
            if(request.body.to) foundMessage.to = request.body.to;
            if(request.body.status) foundMessage.status = request.body.status;
            if(request.body.instructions) foundMessage.instructions = request.body.instructions;
            if(request.body.video) foundMessage.video = request.body.video;
            if(request.body.currency) foundMessage.currency = request.body.video;

            let foundOcasion = Object();
            if(request.body.ocasionId) {
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
            }

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


/*
*
* del: hard delete a specific register based on the database register id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function del(request: Request, response: Response) {

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


/*
*
* sofDelete: soft delete a specific register based on the database register id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function softDelete(request: Request, response: Response) {

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


/*
*
* changeStatus: change the status of a specific Message based on the database register id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function changeStatus(request: Request, response: Response) {
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