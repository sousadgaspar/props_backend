import { body, param } from 'express-validator';

class CategoryValidator {

    validate (method) {
        switch(method) {
            case 'create': return [
                body('name', 'O campo nome não pode estar vazio').notEmpty(),
                body('name').trim().escape(),
                body('description', 'O campo descrição não pode estar vazio').notEmpty(),
                body('description').trim().escape(),
            ]; break;
            case 'show': return [
                param('id', 'A referência do ID que passou não existe').isUUID()
            ]; break;
            case 'update': return [
                param('id', 'A referência do ID que passou não existe').isUUID(),
                body('name', 'O campo nome não pode estar vazio').notEmpty(),
                body('name').trim().escape(),
                body('description', 'O campo descrição não pode estar vazio').notEmpty(),
                body('description').trim().escape(),
            ]; break;
            case 'delete': return [
                param('id', 'A referência do ID que passou não existe').isUUID(),
            ]; break;
            case 'softDelete': return [
                param('id', 'A referência do ID que passou não existe').isUUID(),
            ]; break;
        }
    }

}

export const categoryValidator = new CategoryValidator();