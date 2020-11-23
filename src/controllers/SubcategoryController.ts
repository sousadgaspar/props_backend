import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Subcategory} from '../entity/Subcategory';

class SubcategoryController { 

    async create(request: Request, response: Response) {
        let subcategoryRepository = getRepository(Subcategory);
        let subcategory = new Subcategory();
        subcategory.name = request.body.name;
        subcategory.categoryId = request.body.categoryId;
        subcategory.description = request.body.description;
    
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

    async index(request: Request, response: Response) {
        
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

export let subcategoryController = new SubcategoryController();