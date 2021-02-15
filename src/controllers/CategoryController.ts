import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Category} from '../entity/Category';
import { validationResult } from 'express-validator';

export async function create(request: Request, response: Response) {
    //Validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).send(errors);
    }

    let category = new Category();
    let categoryRepository = getRepository(Category);
    category.name = request.body.name;
    category.description = request.body.description;
    category.image = request.file? request.file.originalname: 'default-user.png';


    // console.log(request.file);
    // return 

    await categoryRepository.save(category)
        .then(value => {
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

    let category = new Category();
    await getRepository(Category).find({relations: ["celebrities"]})
    .then( fectchedCategories => {
        fectchedCategories.forEach((category) => {
            console.log(category.name + category.image);
        })

        response.status(200).send(fectchedCategories);
    })
    .catch(error => {
        response.status(500).send({
            errorName: error.name,
            errorMessage: error.message,
            errorNumber: error.errno,
            errorCode: error.code,
            sqlMessage: error.sqlMessage,
            error: error
        })
    });
}

export async function show(request: Request, response: Response) {

    //Validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).send(errors);
    }

    let categoryRepository = getRepository(Category);

    await categoryRepository.findOne({id: request.params.id})
        .then(foundCategory => {
            response.status(200).send(foundCategory);
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

    //Validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).send(errors);
    }

    let categoryRepository = getRepository(Category);
    await categoryRepository.findOne({id: request.params.id})
        .then(async foundCategory => {
            if(foundCategory === undefined) {
                response.status(404).send({
                    error: true,
                    message: 'recurso não encontrado.'
                })
            }

            foundCategory.name = request.body.name;
            foundCategory.description = request.body.description;

            await categoryRepository.save(foundCategory)
                .then(updatedCategory => {
                    response.status(200).send(updatedCategory);
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

export async function del(request: Request, response: Response) {
    
    //Validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).send(errors);
    }

    let categoryRepository = getRepository(Category);
    await categoryRepository.delete({id: request.params.id})
        .then(result => {
            if(result.affected > 0) {
                response.status(200).send({
                    error: false,
                    message: {"affectedRows": result.affected}
                })
            } else {
                response.status(404).send({
                    error: true,
                    message: {"affectedRows": result.affected}
                })
            }
            
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

    //Validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).send(errors);
    }

    let categoryRepository = getRepository(Category);
    await categoryRepository.softDelete({id: request.params.id})
        .then(result => {
            if(result.raw.affectedRows > 0) {
                response.status(200).send({
                    error: false,
                    message: {"affectedRows": result.affected}
                })
            } else {
                response.status(404).send({
                    error: false,
                    message: 'category not found'
                })
            }
            
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