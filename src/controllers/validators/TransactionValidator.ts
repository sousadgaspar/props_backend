import {body, param} from 'express-validator';

class TransactionValidator {

    validate(method) {
        switch(method) {
            case 'create': return [
                body('accountId').isUUID().notEmpty(),
                body('messageId').isUUID().notEmpty(),
                body('EMISPaymentReference').trim().escape(),
            ];break;
            case 'update': return [
                param('id', 'A referência da transação não está correcta').isUUID(),
                body('accountId', 'A referência da conta não está correcta').isUUID().notEmpty(),
                body('messageId', 'A referência da mensagem não está correcta').isUUID().notEmpty(),
                body('EMISPaymentReference').trim().escape(),
            ];break;
            case 'show': return [
                param('id', 'A referência da transação não está correcta').isUUID(),
            ];break;
            case 'delete': return [
                param('id', 'A referência da transação não está correcta').isUUID(),
            ];break;
            case 'softDelete': return [
                param('id', 'A referência da transação não está correcta').isUUID(),
            ];break;
        }
    }
}

export const transactionValidator = new TransactionValidator();