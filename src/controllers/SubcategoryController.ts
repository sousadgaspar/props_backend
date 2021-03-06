import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Subcategory} from '../entity/Subcategory';
import {Category} from '../entity/Category';
import {validationResult} from 'express-validator';

export async function create(request: Request, response: Response) {
    //validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }
    
    let subcategory = new Subcategory();
    let subcategoryRepository = getRepository(Subcategory);
    let categoryRespository = getRepository(Category);
    
    subcategory.name = request.body.name;
    subcategory.description = request.body.description;
    subcategory.image = request.body.image;

    let foundCategory = Object();
    await categoryRespository.findOne({id: request.body.categoryId})
        .then(category => foundCategory = category)
        .catch(error => {
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
            })
        });

    subcategory.category = foundCategory;

    await subcategoryRepository.save(subcategory)
        .then( value => {
            response.status(200).send(value);
        })
        .catch(error => {
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
            })
        });
}

export async function index(request: Request, response: Response) {

    //validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }

    let subcategoryRepository = getRepository(Subcategory);
    await subcategoryRepository.find({category: {id: request.params.id}})
        .then(foundSubcategories => {
            if(foundSubcategories.length < 1){
                return response.status(404).send({
                    'message': 'no registers found'
                })
            }
            response.status(200).send(foundSubcategories);
        })
        .catch(error => {
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
            })
        })
}

export async function show(request: Request, response: Response) {
    
    //validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }
    
    let subcategoryRepository = getRepository(Subcategory);

    await subcategoryRepository.findOne({id: request.params.id})
        .then(foundSubcategory => {
            if(foundSubcategory === undefined) {
                response.status(404).send({
                    error: false,
                    message: 'subcategory not found'
                })
            }
            response.status(200).send(foundSubcategory);
        })
        .catch(error => {
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
            })
        })
}

export async function update(request: Request, response: Response) {

    //validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }

    let subcategoryRepository = getRepository(Subcategory);
    let categoryRespository = getRepository(Category);
    await subcategoryRepository.findOne({id: request.params.id})
        .then(async foundSubcategory => {
            if(foundSubcategory === undefined) {
                response.status(404).send({
                    error: false,
                    message: 'subcategory not found'
                })
            } 

            foundSubcategory.name = request.body.name;
            foundSubcategory.description = request.body.description;

            let foundCategory = Object();
            await categoryRespository.findOne({id: request.body.id})
                .then(category => foundCategory = category)
                .catch(error => {
                    response.status(500).send({
                        errorName: error.name,
                        errorMessage: error.message,
                        errorNumber: error.errno,
                        errorCode: error.code,
                        sqlMessage: error.sqlMessage,
                    });
                });
            foundSubcategory.category = foundCategory;
            
            await subcategoryRepository.save(foundSubcategory)
                .then(updatedSubcategory => {
                    response.status(200).send(updatedSubcategory);
                })
                .catch(error => {
                    response.status(500).send({
                        errorName: error.name,
                        errorMessage: error.message,
                        errorNumber: error.errno,
                        errorCode: error.code,
                        sqlMessage: error.sqlMessage,
                    })
                })
        })
}

export async function del(request: Request, response: Response) {

    //validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }

    let subcategoryRepository = getRepository(Subcategory);
    await subcategoryRepository.delete({id: request.params.id})
        .then(result => {
            response.status(200).send({
                error: false,
                message: {
                    affectedRows: result.affected
                }
            })
        })
        .catch(error => {
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
            })
        });
}

export async function softDelete(request: Request, response: Response) {

    //validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }

    let subcategoryRepository = getRepository(Subcategory);
    await subcategoryRepository.softDelete({id: request.params.id})
        .then(result => {
            response.status(200).send({
                error: false,
                message: {
                    affectedRows: result.raw.affectedRows
                }
            })
        })
        .catch(error => {
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
            })
        });  
}
