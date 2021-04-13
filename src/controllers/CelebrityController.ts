import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Celebrity} from '../entity/Celebrity';
import {Category} from '../entity/Category';
import { validationResult } from 'express-validator';
import { Subcategory } from '../entity/Subcategory';
import { User } from '../entity/User';
import { Tenant } from '../entity/Tenant';
const bcrypt = require('bcrypt');

/*
*
* create: create a new User register in the database
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
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
    celebrity.user.avatar = request.file? request.file.originalname : 'celebrity-default-photo.png';
    celebrity.user.description = request.body.description;
    celebrity.user.email = request.body.email;
    celebrity.user.password = request.body.password;

    //add tenant to the user celebrity
    //load tenant conditionaly
    if(request.body.tenantId) {
        //load tenant if passed in request
        const tenantRepository = getRepository(Tenant);
        await tenantRepository.findOne({id: request.body.tenantId})
            .then(foundTenant => {
                user.tenants = [foundTenant];
            })
    } else {
        //load the default tenant
        const tenantRepository = getRepository(Tenant);
        await tenantRepository.findOne({name: "international"})
            .then(foundTenant => {
                user.tenants  = [foundTenant];
            })
    }
    
    //hash the password
    const salt = await bcrypt.genSalt(10);
    if(request.body.password) {
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        celebrity.user.password = hashedPassword;
    }
    celebrity.messagePrice = request.body.messagePrice;
    celebrity.messageResponseTime = request.body.messageResponseTime;
    celebrity.user.telephoneNumber = request.body.telephoneNumber;
    celebrity.user.isCelebrity = true;

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


/*
*
* index: list all the User registers in the database
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
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


/*
*
* show: list a specific user based on the database Id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function  show(request: Request, response: Response) {

//validate the request
const errors = validationResult(request);
if(!errors.isEmpty()){
    return response.status(400).json({errors: errors.array()})
}

let celebrityRepository = getRepository(Celebrity);
await celebrityRepository.findOne({id: request.params.id}, {relations: ["user", "categories"]})
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


/*
*
* update: update a specific user based on the database Id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
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


/*
*
* del: hard delete a specific user based on the database Id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function  del(request: Request, response: Response) {

//validate the request
const errors = validationResult(request);
if(!errors.isEmpty()){
    return response.status(400).json({errors: errors.array()})
}

let celebrityRepository = getRepository(Celebrity);
let userRepository = getRepository(User);
await celebrityRepository.delete({id: request.params.id})
    .then(result => {
        userRepository.delete({id: request.body.userId})
        .then(result => {
            console.log("Celebrity user " + request.body.userId + " deleted");
        })
        .catch(error => {
            console.log("Error deleting celebrity user: " + error);
        })
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


/*
*
* del: soft delete a specific user based on the database Id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function  softDelete(request: Request, response: Response) {

//validate the request
const errors = validationResult(request);
if(!errors.isEmpty()){
    return response.status(400).json({errors: errors.array()})
}

let celebrityRepository = getRepository(Celebrity);
let userRepository = getRepository(User);
await celebrityRepository.softDelete({id: request.params.id})
    .then(result => {
        userRepository.softDelete({id: request.body.userId})
            .then(result => console.log("Celebrity user soft deleted successfully " + result))
            .catch(error => console.log("Error soft deleting the celebrity user " + error))
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
