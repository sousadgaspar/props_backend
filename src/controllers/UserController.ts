import {BaseEntity, getRepository, getManager} from 'typeorm';
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {User} from '../entity/User';
import {Account} from '../entity/Account';
const bcrypt = require('bcryptjs');

export async function login(request: Request, response: Response) {
    // //find the user in the database based on the email
    // const userRepository = getRepository(User);
    // const user = await userRepository.findOne({email: request.body.email})
    //     // .then()
    //     // .catch();

    // //check the user
    // if(!user) return response.status(403).json({error: true, message: "user or password wrong"});
    
    // //check the password
    // const validated = await bcrypt.compare(request.body.password, user.password);
    // if(!validated) return response.status(403).send(user.id);
    // console.log(validated);

    // return response.status(200).send({_id: user.id});
}


export async function register(request: Request, response: Response) {
    return create(request, response);
}


export async function create(request: Request, response: Response) {
        //Collect data from the request
        let user = new User();
        user.firstName = request.body.firstName;
        user.lastName = request.body.lastName;
        user.avatar = request.body.avatar;
        user.email = request.body.email;

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

        user.password = hashedPassword;
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
                    return response.status(200).send(value)
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

