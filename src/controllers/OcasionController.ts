import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Ocasion} from '../entity/Ocasion';

class OcasionController { 

    async create(request: Request, response: Response) {
        let ocasion = new Ocasion();
        ocasion.name = request.body.name;
        ocasion.description = request.body.description;

        let ocasionRepository = getRepository(Ocasion);
        await ocasionRepository.save(ocasion)
            .then(savedOcasion => {
                response.status(200).send(savedOcasion);
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                });  
            });
    }

    async index(request: Request, response: Response) {
        let ocasion = new Ocasion();
        let ocasionRepository = getRepository(Ocasion);

        await ocasionRepository.find(ocasion)
            .then(foundOcasion => {
                response.status(200).send(foundOcasion);
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                });
            });
    }

    async show(request: Request, response: Response) {
        let ocasionRepository = getRepository(Ocasion);

        await ocasionRepository.findOne({id: request.params.id})
            .then(foundOcasion => {
                response.status(200).send(foundOcasion);
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                });
            })
    }

    async update(request: Request, response: Response) {
        let ocasion = new Ocasion();
        let ocasionRepository = getRepository(Ocasion)
        await ocasionRepository.findOne({id: request.params.id})
            .then(async foundOcasion => {
                foundOcasion.name = request.body.name;
                foundOcasion.description = request.body.description;

                await ocasionRepository.save(foundOcasion)
                    .then(savedOcasion => {
                        response.status(200).send(savedOcasion);
                    })
                    .catch(error => {
                        response.status(500).send({
                            errorName: error.name,
                            errorMessage: error.message,
                            errorNumber: error.errno,
                            errorCode: error.code,
                            sqlMessage: error.sqlMessage,
                        });
                    });
            })
            .catch();
        
    }

    async delete(request: Request, response: Response) {
        let ocasionRepository = getRepository(Ocasion);

        await ocasionRepository.delete({id: request.params.id})
            .then(result => {
                response.status(200).send(result)
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                });
            })
    }

    async softDelete(request: Request, response: Response) {
        let ocasionRepository = getRepository(Ocasion);

        await ocasionRepository.softDelete({id: request.params.id})
            .then(result => {
                response.status(200).send(result)
            })
            .catch(error => {
                response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                });
            })
    }

}

export let ocasionController = new OcasionController();