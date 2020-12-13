import {BaseEntity, getRepository, getManager} from 'typeorm';
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {User} from '../entity/User';
import {Account} from '../entity/Account';

class UserController extends BaseEntity{

    async create(request: Request, response: Response) {
            //Collect data from the request
            let user = new User();
            user.firstName = request.body.firstName;
            user.lastName = request.body.lastName;
            user.avatar = request.body.avatar;
            user.email = request.body.email;
            user.password = request.body.password;
            user.birthDate = request.body.birthDate;
            user.telephoneNumber = request.body.telephoneNumber;
            user.gender = request.body.gender;

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
                        response.status(200).send(value)
                    })
                    .catch(error => {
                        response.status(500).send({
                            // errorName: error.name,
                            // errorMessage: error.message,
                            // errorNumber: error.errno,
                            // errorCode: error.code,
                            // sqlMessage: error.sqlMessage,
                            error
                        })
                    });

            })



    }


    async index(request: Request, response: Response) {
        let user = new User();
        let userRepository = getRepository(User);
        await userRepository.find(user)
        .then(value => {
            console.log(value);
            response.status(200).send(value);
        })
        .catch(error => {
            response.status(500).send({
                // errorName: error.name,
                // errorMessage: error.message,
                // errorNumber: error.errno,
                // errorCode: error.code,
                // sqlMessage: error.sqlMessage,
                error
            });
        });
    }


    async show(request: Request, response: Response) {
        
        //validate the request
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()})
        }

        let userRepository = getRepository(User);
        await userRepository.findOne({id: request.params.id}).then( value => {
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


    async update(request: Request, response: Response) {
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
                foundUser.password = request.body.password;
                foundUser.birthDate = request.body.birthDate;
                foundUser.telephoneNumber = request.body.telephoneNumber;

                await userRepository.save(foundUser)
                    .then( savedUser => {
                        response.status(200).send(savedUser);
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
                .catch(error => {
                    response.status(500).send({
                        errorName: error.name,
                        errorMessage: error.message,
                        errorNumber: error.errno,
                        errorCode: error.code,
                        sqlMessage: error.sqlMessage,
                    });
                });
            response.send({
                id: request.params.id,
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                password: request.body.password
            });
    }

    async delete(request: Request, response: Request) {

        //validate the request
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()})
        }

        let userRepository = getRepository(User);
        await userRepository.delete({id: request.params.id})
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

    async softDelete(request: Request, response: Response) {
        //validate the request
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()})
        }

        let userRepository = getRepository(User);
        await userRepository.softDelete({id: request.params.id})
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
}


export let userController = new UserController();

