
import {body, param, check, header} from 'express-validator';


export function validate(method) {
    switch(method) {
        case 'create': 
        return [
            body('name', 'O nome da instancia é um campo obrigatório').notEmpty().trim().escape(),
            body('currency', 'O campo Moeda deve ter no minimo 2 caracteres').isLength({min: 2}).escape(),
            body('currency', 'O campo Moeda é obrigatório').notEmpty(),
            body('paymentGateways', 'O campo paymentGateways é obrigatório').notEmpty().trim(),
        ]; break;

        case 'show': 
        return [
            param('id', 'A referência do ID que passou não existe').isUUID(),
        ]; break;

        case 'delete': 
        return [
            param('id', 'A referência do ID que passou não existe').isUUID(),
        ]; break;

        case 'softDelete': 
        return [
            param('id', 'A referência do ID que passou não existe').isUUID(),
        ]; break;
    }
}