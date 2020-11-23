import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Account} from '../entity/Account';

class AccountController { 

    async create(request: Request, response: Response) {
        //validate the request data
        //store the validated data
        response.send({
            credit: 0,
            bankName: request.body.bankName,
            bankAccountNumber: request.body.bankAccountNumber,
            bankAccountIBAN: request.body.bankAccountIBAN,
        });
    }

    async index(request: Request, response: Response) {
        
    }

    async show(request: Request, response: Response) {
        
    }

    async update(request: Request, response: Response) {
        
    }

    async delete(request: Request, response: Response) {
        
    }

    async softDelete(request: Request, response: Response) {
        
    }

    async credit(request: Request, response: Response) {
        //fetch the account
        let account = {
            value: 3000,
        }
        //update the account value
        account.value += Number(request.body.valueToAdd);

        //return the new credit
        response.send({
            id: request.params.id,
            value: account.value
        });
    }

    async debit (request: Request, response: Response) {
        //fetch the account
        let account = {
            value: 0,
        }
        //update the account value
        account.value -= Number(request.body.valueToAdd);

        //return the new credit
        response.send({
            id: request.params.id,
            value: account.value
        });
    }

}

export let accountController = new AccountController();