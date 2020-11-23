import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Transaction} from '../entity/Transaction';

class TransactionController { 

    async create(request: Request, response: Response) {
        //validate the data
        //create the transaction
        response.send({
            name: 'carregamento',
            value: 3000,
            messagePrice: 500,
            creditBefore: 3000,
            creditAfter: 2500,
            userId: 3,
            accountId: 5,
            celebrityId: 3,
            messageId: 49,
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

}

export let transactionController = new TransactionController();