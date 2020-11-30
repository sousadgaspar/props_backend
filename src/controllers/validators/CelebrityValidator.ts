import { body, param, check } from 'express-validator';
import { Celebrity } from '../../entity/Celebrity';

class CelebrityValidator {

    validate (method) {

        switch(method) {
            case 'create': 
                return [
                    body('firstName').notEmpty().trim().escape(),
                    body('lastName').trim().escape(),
                    body('nickName').trim().escape(),
                    body('messagePrice').notEmpty().trim().escape(),
                    body('messageResponseTime').notEmpty().trim().escape(),
                    body('password').notEmpty().trim().escape(),
                    body('description').trim().escape()
                ]; break;
        }
        
    }

}

export const celebrityValidator = new CelebrityValidator();
