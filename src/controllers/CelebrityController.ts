import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Celebrity} from '../entity/Celebrity';
import {Category} from '../entity/Category';
import { validationResult } from 'express-validator';
import { Subcategory } from '../entity/Subcategory';
import { User } from '../entity/User';

//create
export async function create(request: Request, response: Response) {
    //Validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }

    if(!request.body.categoryId) return response.status(400).json({error: true, message: "Category is not set"});

    let celebrityRepository = getRepository(Celebrity);
    let categoryRepository = getRepository(Category);
    let user = new User();
    let celebrity = new Celebrity();

    celebrity.user = user;
    celebrity.user.firstName = request.body.firstName;
    celebrity.user.lastName = request.body.lastName;
    celebrity.user.nickName = request.body.nickName;
    celebrity.user.avatar = request.body.avatar;
    celebrity.user.description = request.body.description;
    celebrity.user.email = request.body.email;
    celebrity.user.password = request.body.password;
    celebrity.messagePrice = request.body.messagePrice;
    celebrity.messagePriceCurrency = request.body.messagePriceCurrency;
    celebrity.messageResponseTime = request.body.messageResponseTime;
    celebrity.user.telephoneNumber = request.body.telephoneNumber;

    let returnedCategory = Object();
    await categoryRepository.findOne({id: request.body.categoryId})
        .then(category => {
            returnedCategory = category;
        })
        .catch(error => {
            console.log(error);
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
            })
        });

    celebrity.categories = [returnedCategory];

    await celebrityRepository.save(celebrity)
        .then(async value => {
            response.status(200).send(value)
        })
        .catch(error => {
            console.log(error);
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
                error: error
            });
        });
}


//Index
export async function  index(request: Request, response: Response) {
let celebrity = new Celebrity();
let celebrityRepository = getRepository(Celebrity);

await celebrityRepository.find(celebrity)
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
        }); 
    })
}

//Show
export async function  show(request: Request, response: Response) {

//validate the request
const errors = validationResult(request);
if(!errors.isEmpty()){
    return response.status(400).json({errors: errors.array()})
}

let celebrityRepository = getRepository(Celebrity);
await celebrityRepository.findOne({id: request.params.id}, {relations: ["user", "categories", "subcategories"]})
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
        });
    });
}

export async function  update(request: Request, response: Response) {
//validate the request
const errors = validationResult(request);
if(!errors.isEmpty()){
    return response.status(400).send({errors: errors.array()})
}

let celebrityRepository = getRepository(Celebrity);
let categoryRepository = getRepository(Category);
let subcategoryRepository = getRepository(Subcategory);

await celebrityRepository.findOne({id: request.params.id})
    .then(async foundCelebrity => {
        
        if( typeof foundCelebrity == 'undefined') response.status(403).send({error: "The reference for Celebrity Entity was not found"});

        let user = new User();
        foundCelebrity.user = user;
        foundCelebrity.user.firstName = request.body.firstName;
        foundCelebrity.user.lastName = request.body.lastName;
        foundCelebrity.user.nickName = request.body.nickName;
        foundCelebrity.user.avatar = request.body.avatar;
        foundCelebrity.user.password = request.body.password;
        foundCelebrity.user.email = request.body.email;
        foundCelebrity.user.telephoneNumber = request.body.telephoneNumber;

        if( typeof request.body.categoryId !== 'undefined') {
            let foundCategory = Object();
            await categoryRepository.findOne({id: request.body.categoryId})
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

            let foundSubcategory = Object();
            await subcategoryRepository.findOne({id: request.body.subcategoryId})
                .then(subcategory => foundSubcategory = subcategory)
                .catch(error => {
                    response.status(500).send({
                        errorName: error.name,
                        errorMessage: error.message,
                        errorNumber: error.errno,
                        errorCode: error.code,
                        sqlMessage: error.sqlMessage,
                    })
                });


            foundCategory.subcategories = [foundSubcategory];
            foundCelebrity.categories = foundCategory;
        }

        foundCelebrity.user.description = request.body.description;
        foundCelebrity.messageResponseTime = request.body.messageResponseTime;
        foundCelebrity.messagePrice = request.body.messagePrice;
        foundCelebrity.messagePriceCurrency = request.body.messagePriceCurrency;
    
        await celebrityRepository.save(foundCelebrity)
            .then(savedCelebrity => {
                response.status(200).send(savedCelebrity);
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
    })
    .catch()
}


//Delete
export async function  del(request: Request, response: Response) {

//validate the request
const errors = validationResult(request);
if(!errors.isEmpty()){
    return response.status(400).json({errors: errors.array()})
}

let celebrityRepository = getRepository(Celebrity);
await celebrityRepository.delete({id: request.params.id})
    .then(result => {
        response.status(200).send(result);
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


//Soft Delete
export async function  softDelete(request: Request, response: Response) {

//validate the request
const errors = validationResult(request);
if(!errors.isEmpty()){
    return response.status(400).json({errors: errors.array()})
}

let celebrityRepository = getRepository(Celebrity);
await celebrityRepository.softDelete({id: request.params.id})
    .then(result => {
        response.status(200).send(result);
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
