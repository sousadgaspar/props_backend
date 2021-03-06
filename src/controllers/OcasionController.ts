import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Ocasion} from '../entity/Ocasion';
import {validationResult} from 'express-validator';

/*
*
* create: create an Ocasion register in the database
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function create(request: Request, response: Response) {

    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }

    let ocasion = new Ocasion();
    ocasion.name = request.body.name;
    ocasion.description = request.body.description;
    ocasion.image = request.file.originalname;

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


/*
*
* index: list all Ocasion registers in the database
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function index(request: Request, response: Response) {
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


/*
*
* show: list a specific ocasion based in the id index
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function show(request: Request, response: Response) {

    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }

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


/*
*
* update: update a specific ocasion based in the id index
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function update(request: Request, response: Response) {

    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }

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


/*
*
* del: hard delete a specific ocasion based in the id index
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function del(request: Request, response: Response) {
    
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }
    
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


/*
*
* softDelete: soft delete a specific ocasion based in the id index
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function softDelete(request: Request, response: Response) {
    
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }
    
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
