import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Category} from '../entity/Category';

class CategoryController { 

    async create(request: Request, response: Response) {
        let category = new Category();
        let categoryRepository = getRepository(Category);
        category.name = request.body.name;
        category.description = request.body.description;

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

    async index(request: Request, response: Response) {
        let category = new Category();
        await getRepository(Category).find(category)
        .then( fectchedCategories => {
            console.log(fectchedCategories);
            response.status(200).send(fectchedCategories);
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

    async show(request: Request, response: Response) {
        
    }

    async update(request: Request, response: Response) {
        
    }

    async delete(request: Request, response: Response) {
        
    }

    async softDelete(request: Request, response: Response) {
        
    }

}

export let categoryController = new CategoryController();