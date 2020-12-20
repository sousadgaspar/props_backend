import {PaymentGateway} from '../entity/PaymentGateway';
import {Request, Response} from 'express';

export function generatePaymentReference(request: Request, response: Response) {
    response.status(200).send({
        'paymentRefence': '434 434 979 4'
    })
}