import { body, param } from 'express-validator';

class SubcategoryValidator {

    validate (method) {
        switch(method) {
            case 'create': return [
                body('name', 'O campo nome é obrigatório').notEmpty().trim().escape(),
                body('description', 'O campo descrição é obrigatório').notEmpty().trim().escape(),
                body('categoryId', 'A referência da categoria não está correcta').isUUID(),
            ]; break;
            case 'show': return [
                param('id', 'A referencia da subcategoria não está correcta').isUUID(),
            ]; break;
            case 'update': return [
                param('id', 'A referencia da subcategoria não está correcta').isUUID(),
                body('name', 'O campo nome é obrigatório').notEmpty().trim().escape(),
                body('description', 'O campo descrição é obrigatório').notEmpty().trim().escape(),
                body('categoryId', 'A referência da categoria não está correcta').isUUID(),
            ]; break;
            case 'delete': return [
                param('id', 'A referencia da subcategoria não está correcta').isUUID(),
            ]; break;
            case 'softDelete': return [
                param('id', 'A referencia da subcategoria não está correcta').isUUID(),
            ]; break;
        }
    }

}

export const subcategoryValidator = new SubcategoryValidator();