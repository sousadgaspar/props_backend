import { body, header, param } from 'express-validator';


 export function validate (method) {
    switch(method) {
        case 'create': return [
            body('from', 'O campo De: não pode estar vazio').notEmpty(),
            body('from', 'Escreva o nome no formato correcto').escape(),
            body('to', 'O campo Para: não pode estar vazio').notEmpty(),
            body('to', 'Escreva o nome no formato correcto').escape(),
            body('instructions', 'O campo instruções não pode estar vazio').notEmpty(),
            body('instructions', 'Escreva as instruções no formato correcto').escape(),
            body('userId', 'A referência do usuário não está correcta').notEmpty(),
            body('userId', 'A referência do usuário está incorrecta').isUUID(),
            body('celebrityId', 'A referência da celebridade não está correcta').notEmpty(),
            body('celebrityId', 'A referência da celebridade está incorrecta').isUUID(),
            body('ocasionId', 'A referência da ocasião não está correcta').notEmpty(),
            body('ocasionId', 'A referência da ocasião está incorrecta').isUUID(),
        ]; break;
        case 'show': return [
            param('id', 'A referência do ID que passou não existe').isUUID(),
        ]; break;
        case 'update': return [
            param('id', 'A referência do ID que passou não existe').isUUID(),
            body('from', 'O campo De: não pode estar vazio').notEmpty(),
            body('from', 'Escreva o nome no formato correcto').escape(),
            body('to', 'O campo Para: não pode estar vazio').notEmpty(),
            body('to', 'Escreva o nome no formato correcto').escape(),
            body('instructions', 'O campo instruções não pode estar vazio').notEmpty(),
            body('instructions', 'Escreva as instruções no formato correcto').escape(),
            body('instructions'),
        ]; break;
        case 'delete': return [
            param('id', 'A referência do ID que passou não existe').isUUID(),
        ]; break;
        case 'softDelete': return [
            param('id', 'A referência do ID que passou não existe').isUUID(),
        ]; break;
        case 'uploadVideoMessage': return [
            param('id', 'A referência do ID que passou não existe').isUUID(), 
        ]; break;
    }
}