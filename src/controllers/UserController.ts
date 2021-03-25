import {BaseEntity, getRepository, getManager} from 'typeorm';
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {User} from '../entity/User';
import {Account} from '../entity/Account';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
dotEnv.config();


/*
*
* create: login to the system, check the credentials, email or telephone number and password
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function login(request: Request, response: Response) {

    //find the user in the database based on the email or telephoneNumber
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({where: [{email: request.body.email}, {telephoneNumber: request.body.telephoneNumber}]})

    //check the user
    if(!user) return response.status(400).json({error: true, message: "user not found"});
    
    //check the password
    const validated = await bcrypt.compare(request.body.password, user.password);
    if(!validated) return response.status(400).send({error: true, message: "user or password wrong"});

    //create a new token
    const token = jwt.sign({_id: user.id}, process.env.API_PUBLIC_KEY, {expiresIn: '365d'});

    return response.status(200).send({success: true, _id: user.id, user: user, token: token});
}


/*
*
* onboard: create a User register only with the telephone number (Lite user);
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function onboard(request: Request, response: Response) {
    //create a user only with the telephone number;
}


/*
*
* register: a wrapper of create method
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function register(request: Request, response: Response) {
    return create(request, response);
}


/*
*
* create: create a new register of the User object in the database
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function create(request: Request, response: Response) {
        //Collect data from the request
        let user = new User();
        user.firstName = request.body.firstName;
        user.lastName = request.body.lastName;
        user.avatar = request.file? request.file.originalname: 'default-user.png';
        user.email = request.body.email;

        //hash the password
        const salt = await bcrypt.genSalt(10);
        if(request.body.password) {
            const hashedPassword = await bcrypt.hash(request.body.password, salt);
            user.password = hashedPassword;
        }
        user.birthDate = request.body.birthDate;
        user.telephoneNumber = request.body.telephoneNumber;
        user.gender = request.body.gender;
        request.body.country? user.country = request.body.country: "angola";//add something like DEFAULT_COUNTRY from .env file

        //validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }

        //start a transaction in the database
        await getManager().transaction(async transactionEntityManager => {
            //create a new account for the user
            user.account = new Account;

            //save the user
            await transactionEntityManager.save(user)
                .then((value) => {
                    //generate the token
                    const token = jwt.sign({_id: value.id}, process.env.API_PUBLIC_KEY, {expiresIn: '365d'});
                    return response.status(201).send({user: user, token: token});
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
        })
}



/*
*
* index: list all the User register in the database
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function  index(request: Request, response: Response) {
    let user = new User();
    let userRepository = getRepository(User);
    await userRepository.find(user)
    .then(value => {
        return response.status(200).send(value);
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
* show: list a specific User based on the id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function show(request: Request, response: Response) {
    
    //validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }

    let userRepository = getRepository(User);
    await userRepository.findOne({id: request.params.id}).then( value => {
        return response.status(200).send(value);
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
* udate: update a specific User information based on the id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function update(request: Request, response: Response) {
    let userRepository = getRepository(User);

    //validate the request
    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }

    await userRepository.findOne({id: request.params.id})
        .then(async foundUser => {
            foundUser.firstName = request.body.firstName;
            foundUser.lastName = request.body.lastName;
            foundUser.avatar = request.body.avatar;
            
            //hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(request.body.password, salt);

            foundUser.password = hashedPassword;
            foundUser.birthDate = request.body.birthDate;
            foundUser.telephoneNumber = request.body.telephoneNumber;

            await userRepository.save(foundUser)
                .then( savedUser => {
                    return response.status(200).send(savedUser);
                })
                .catch(error => {
                    return response.status(500).send({
                        errorName: error.name,
                        errorMessage: error.message,
                        errorNumber: error.errno,
                        errorCode: error.code,
                        sqlMessage: error.sqlMessage,
                    });
                });
            })
            .catch(error => {
                return response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                });
            });
        return response.status(200).send({
            id: request.params.id,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password
        });
}


/*
*
* del: hard delete a specific User based on the id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function del(request: Request, response: Request) {

    //validate the request
    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }

    let userRepository = getRepository(User);
    await userRepository.delete({id: request.params.id})
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
            });
        })
}


/*
*
* softDelete: soft delete a specific User based on the id
* @params> 
*   request: Http Request object
*   response: Http Response object
*
*/
export async function softDelete(request: Request, response: Response) {
    //validate the request
    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }

    let userRepository = getRepository(User);
    await userRepository.softDelete({id: request.params.id})
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
            });
        })
}

