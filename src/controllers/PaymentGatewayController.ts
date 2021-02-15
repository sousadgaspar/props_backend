import {PaymentGateway} from '../entity/PaymentGateway';
import {Request, Response} from 'express';

export function generatePaymentReference(request: Request, response: Response) {

    const reference = (Math.floor(Math.random() * (10000 - 1000) + 1000));

    console.log("Gerado uma nova refencia: " + reference);
    response.status(200).send({
        'paymentRefence': reference
    })
}