import {Request} from 'express';
import {body, param, check, header} from 'express-validator';
import {User} from '../../entity/User';

class UserValidator{

    validate(method) {
        switch(method) {
            case 'create': 
            return [
                body('firstName', 'O nome é um campo obrigatório').notEmpty().trim().escape(),
                body('lastName', 'O último nome é um campo obrigatório').trim().escape(),
                body('nickName').trim().escape(),
                body('password', 'O campo senha deve ter no minimo 3 caracteres').isLength({min: 3}).escape(),
                body('password', 'O campo senha é obrigatório').notEmpty(),
                body('email', 'Escreva um e-mail no formato correcto').isEmail(),
                body('email', 'O campo e-mail é obrigatório').notEmpty(),
                body('avatar').trim(),
            ]; break;

            case 'show': 
            return [
                param('id', 'A referência do ID que passou não existe').notEmpty(),
                param('id', 'A referência do ID que passou não existe').isUUID(),
            ]; break;

            case 'update': 
            return [
                param('id', 'A referência do ID que passou não existe').notEmpty(),
                param('id', 'A referência do ID que passou não existe').isUUID(),
            ]; break;

            case 'delete': 
            return [
                param('id', 'A referência do ID que passou não existe').notEmpty(),
                param('id', 'A referência do ID que passou não existe').isUUID(),
            ]; break;

            case 'softDelete': 
            return [
                param('id', 'A referência do ID que passou não existe').notEmpty(),
                param('id', 'A referência do ID que passou não existe').isUUID(),
            ]; break;
        }
    }
}

export const userValidator = new UserValidator();