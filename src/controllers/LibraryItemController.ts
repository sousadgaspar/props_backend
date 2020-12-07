import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {LibraryItem} from '../entity/LibraryItem';
import {validationResult} from 'express-validator';

class LibraryItemController { 

    async create(request: Request, response: Response) {
        //validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).send({errors: errors.array()});
        }

        const libraryItem = new LibraryItem();
        libraryItem.media = request.body.media;
        libraryItem.celebrityId = request.body.celebrityId;
        libraryItem.path = request.body.path;
        libraryItem.type = request.body.type;

        const libraryItemRepository = getRepository(LibraryItem);
        await libraryItemRepository.save(libraryItem)
            .then(savedLibraryItem => {
                return response.status(200).send(savedLibraryItem);
            })
            .catch(error => {
                return response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            })
    }

    async index(request: Request, response: Response) {
        const libraryItemRepository = getRepository(LibraryItem);
        await libraryItemRepository.find()
            .then(foundItems => {
                return response.status(200).send(foundItems);
            })
            .catch(error => {
                return response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            })
    }

    async show(request: Request, response: Response) {

        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).send({errors: errors.array()})
        }

        const libraryItemRepository = getRepository(LibraryItem);
        await libraryItemRepository.findOne({id: request.params.id})
            .then(foundLibraryItem => {
                console.log(foundLibraryItem);
                return response.status(200).send(foundLibraryItem);
            })
            .catch(error => {
                return response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            });
    }

    async delete(request: Request, response: Response) {
        
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).send({errors: errors.array()});
        }

        const libraryItemRepository = getRepository(LibraryItem);
        await libraryItemRepository.delete({id: request.params.id})
            .then(result => {
                return response.status(200).send(result);
            })
            .catch(error => {
                return response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            });
    }

    async softDelete(request: Request, response: Response) {
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).send({errors: errors.array()});
        }

        const libraryItemRepository = getRepository(LibraryItem);
        await libraryItemRepository.softDelete({id: request.params.id})
            .then(result => {
                return response.status(200).send(result);
            })
            .catch(error => {
                return response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                })
            });
    }

}

export let libraryItemController = new LibraryItemController();