import {getRepository, getConnection} from 'typeorm';
import {Request, Response} from 'express';
import {Transaction} from '../entity/Transaction';
import {Account} from '../entity/Account';
import {validationResult} from 'express-validator';


class TransactionController { 

    async create(request: Request, response: Response) {

        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors});
        }

        const accountRepository = getRepository(Account);
        const transactionRepository = getRepository(Transaction);

        let transaction = new Transaction();
        transaction.type = request.body.type;
        transaction.messageId = request.body.messageId;
        transaction.value = request.body.value;

        //get the account value

        await accountRepository.findOne({id: request.body.accountId})
            .then(foundAccount => {
                if(foundAccount === undefined) {
                    response.status(404).send({
                        error: true,
                        message: 'The account reference is invalid.'
                    })
                }
                transaction.valueBeforeTransaction = foundAccount.value;
                transaction.account = foundAccount;
            })
        transaction.valueAfterTransaction = transaction.valueBeforeTransaction + request.body.value;
        transaction.EMISPaymentReference = request.body.EMISPaymentReference;
        
        await transactionRepository.save(transaction)
            .then(savedTransaction => {
                response.status(200).send(savedTransaction);
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
        
        //Validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors});
        }
        
        let transaction = new Transaction();
        let transactionRepository = getRepository(Transaction);
        await transactionRepository.find(transaction)
            .then(foundTransactions => {
                response.status(200).send(foundTransactions);
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

        let transactionRepository = getRepository(Transaction);
        await transactionRepository.findOne({id: request.params.id})
            .then(foundTransaction => {
                response.status(200).send(foundTransaction);
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

        let transactionRepository = getRepository(Transaction);
        await transactionRepository.findOne({id: request.params.id})
            .then(async foundTransaction => {

                foundTransaction.EMISPaymentReferenceStatus = request.body.EMISPaymentReferenceStatus;
                foundTransaction.isComplete = request.body.isComplete;

                await transactionRepository.save(foundTransaction)
                    .then(updatedTransaction => {
 
                        response.status(200).send(updatedTransaction);
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

    async delete(request: Request, response: Response) {
        //Transactions can't be delete in practice   
    }

    async softDelete(request: Request, response: Response) {
        //Transactions can't be delete in practice
    }

}

export let transactionController = new TransactionController();