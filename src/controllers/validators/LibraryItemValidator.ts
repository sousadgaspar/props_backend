import {body, param} from 'express-validator';

class LibraryItemValidator {

    validate(method) {
        switch(method) {
            case 'create': return [
                body('media', 'The field media is required').notEmpty().trim().escape(),
                body('path').trim().escape(),
                body('celebrityId', 'The refence of Celebrity entity is not correct').isUUID(),
            ]; break;
            case 'show': return [
                param('id', 'The refence of Celebrity entity is not correct').isUUID(),
            ];break;
            case 'delete': return [
                param('id', 'The refence of Celebrity entity is not correct').isUUID(),
            ];break;
            case 'softDelete': return [
                param('id', 'The refence of Celebrity entity is not correct').isUUID(),
            ];break;
        }
    }

}

export const libraryItemValidator = new LibraryItemValidator();