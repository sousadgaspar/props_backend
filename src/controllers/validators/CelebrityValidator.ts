import { body, param, header } from 'express-validator';

class CelebrityValidator {

    validate(method) {
        switch(method) {
            case 'create': 
                return [
                    body('firstName', 'O campo primeiro nome é obrigatório').notEmpty().trim(),
                    body('firstName', 'Escreva o nome no formato correcto').escape(),
                    body('lastName', 'Escreva o nome no formato correcto').escape().trim(),
                    body('nickName', 'Escreva o nome no formato correcto').escape().trim(),
                    body('avatar', 'O nome da midia está em um formato incorrecto').escape().trim(),
                    body('email', 'O e-mail é um campo obrigatório').isEmail(),
                    body('email', 'Escreva o e-mail no formato correcto').notEmpty().trim(),
                    body('password', 'Escreva o e-mail no formato correcto').escape().trim(),
                    body('description', 'Parece que há caracteres que não são texto simples').escape().trim(),
                    body('messageResponseTime', 'O campo tempo deve ser somente números inteiros').isInt().trim(),
                    body('messagePrice', 'Escreva o preço no formato correcto').isCurrency().trim(),
                ]; break;
            case 'show': 
                return [
                    param('id', 'A referência do ID que passou não existe').isUUID(),
                ]; break;
            case 'update':
                return [
                    param('id', 'O parâmetro ID não é válido').isUUID(),
                    body('firstName', 'O campo primeiro nome é obrigatório').notEmpty().trim(),
                    body('firstName', 'Escreva o nome no formato correcto').escape(),
                    body('lastName', 'Escreva o nome no formato correcto').escape().trim(),
                    body('nickName', 'Escreva o nome no formato correcto').escape().trim(),
                    body('avatar', 'O nome da midia está em um formato incorrecto').escape().trim(),
                    body('email', 'O e-mail é um campo obrigatório').isEmail(),
                    body('email', 'Escreva o e-mail no formato correcto').notEmpty().trim(),
                    body('password', 'Escreva o e-mail no formato correcto').escape().trim(),
                    body('description', 'Parece que há caracteres que não são texto simples').escape().trim(),
                    body('messageResponseTime', 'O campo tempo deve ser somente números inteiros').isInt().trim(),
                    body('messagePrice', 'Escreva o preço no formato correcto').isCurrency().trim(),
                ];break;
            case 'delete':
                return [
                    param('id', 'O parâmetro ID não é válido').isUUID(),
                ];break;
            case 'softDelete': 
                return [
                    param('id', 'O parâmetro ID não é válido').isUUID(),
                ];break;
        }
    }
}

export const celebrityValidator = new CelebrityValidator();