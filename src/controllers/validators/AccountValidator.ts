import {body, param} from 'express-validator';

class AccountValidator {

    validate (method) {
        switch(method) {
            case 'create': return [
                body('bankName', 'O campo nome do banco deve ser um nome válido').isString().trim(),
                body('bankAccountNumber', 'O campo número de conta deve ser um número de conta válido').isNumeric().trim(),
                body('bankAccountIBAN', 'O campo IBAN deve ser um IBAN válido').isString().trim()
            ]; break;
            case 'show': return [

            ]; break;
            case 'update': return [
                param('id', 'A referência do ID que passou não existe').isUUID(),
                body('bankName', 'O campo nome do banco deve ser um nome válido').isString().trim(),
                body('bankAccountNumber', 'O campo número de conta deve ser um número de conta válido').isNumeric().trim(),
                body('bankAccountIBAN', 'O campo IBAN deve ser um IBAN válido').isString().trim()
            ]; break;
            case 'delete': return [
                param('id', 'A referência do ID que passou não existe').isUUID(),
            ]; break;
            case 'softDelete': return [
                param('id', 'A referência do ID que passou não existe').isUUID(),
            ]; break;
            case 'credit': return [
                param('id', 'A referência do ID que passou não existe').isUUID(),
            ]; break;
            case 'debit': return [
                param('id', 'A referência do ID que passou não existe').isUUID(),
            ]; break;
        }
    }

}
export const accountValidator = new AccountValidator();