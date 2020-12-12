import {getRepository, PrimaryColumn} from 'typeorm';
import {Request, Response} from 'express';
import {Account} from '../entity/Account';
import { Ocasion } from '../entity/Ocasion';
import {validationResult} from 'express-validator';

class AccountController { 

    async create(request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors});
        }

        let account = new Account();
        account.bankName = request.body.bankName;
        account.bankAccountNumber = request.body.bankAccountNumber;
        account.bankAccountIBAN = request.body.bankAccountIBAN;

        let accountRepository = getRepository(Account);
        await accountRepository.save(account)
            .then(savedAccount => {
                response.status(200).send(savedAccount)
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            })
    }

    async index(request: Request, response: Response) {

        let account = new Account();
        let accountRepository = getRepository(Account);
        await accountRepository.find(account)
            .then(foundAccount => {
                response.status(200).send(foundAccount);
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            })

    }

    async show(request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors});
        }

        let accountRepository = getRepository(Account);
        await accountRepository.findOne({id: request.params.id})
            .then(foundedAccount => {
                response.status(200).send(foundedAccount);
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            })
    }

    async update(request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors});
        }

        let accountRepository = getRepository(Account);
        await accountRepository.findOne({id: request.params.id})
            .then(async foundAccount => {
                if(foundAccount === undefined){
                    response.status(404).send({
                        error: true,
                        message: 'Conta não encontrada'
                    });
                    return;
                }
                foundAccount.bankName = request.body.bankName;
                foundAccount.bankAccountNumber = request.body.bankAccountNumber;
                foundAccount.bankAccountIBAN = request.body.bankAccountIBAN;

                await accountRepository.save(foundAccount)
                    .then(savedAccount => {
                        response.status(200).send(savedAccount);
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
            })
    }

    async delete(request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors});
        }

        let accountRepository = getRepository(Account);
        await accountRepository.delete({id: request.params.id})
            .then(result =>{
                response.status(200).send(result);
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            })
    }

    async softDelete(request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors});
        }

        let accountRepository = getRepository(Account);
        await accountRepository.softDelete({id: request.params.id})
            .then(result =>{
                response.status(200).send(result);
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            })
    }

    async credit(request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors});
        }

        let accountRepository = getRepository(Account);
        await accountRepository.findOne({id: request.params.id})
            .then(async foundAccount => {
                if(foundAccount === undefined){
                    response.status(404).send({
                        error: true,
                        message: 'Conta não encontrada'
                    });
                    return;
                }
                foundAccount.value += request.body.value;

                await accountRepository.save(foundAccount)
                    .then(savedAccount => {
                        response.status(200).send(String(savedAccount.value));
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
            })
    }

    async debit (request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors});
        }

        let accountRepository = getRepository(Account);
        await accountRepository.findOne({id: request.params.id})
            .then(async foundAccount => {
                if(foundAccount === undefined){
                    response.status(404).send({
                        error: true,
                        message: 'Conta não encontrada'
                    });
                    return;
                }
                foundAccount.value -= request.body.value;

                await accountRepository.save(foundAccount)
                    .then(savedAccount => {
                        response.status(200).send(String(savedAccount.value));
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
            })
    }

}

export let accountController = new AccountController();