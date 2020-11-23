import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {User} from '../entity/User';

class UserController {

    async create(request: Request, response: Response) {
            let user = new User();
            //save to the database
            user.firstName = request.body.firstName;
            user.lastName = request.body.lastName;
            user.avatar = request.body.avatar;
            user.email = request.body.email;
            user.password = request.body.password;
            user.birthDate = request.body.birthDate;
        
            let userRepository = getRepository(User);
        
            await userRepository.save(user)
                .then((value) => {
                    response.status(200).send(value)
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
        let user = new User();
        let userRepository = getRepository(User);
        await userRepository.find(user)
        .then(value => {
            console.log("List of Users fetched: " + value);
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


    async show(request: Request, response: Response) {
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
        await userRepository.findOne({id: request.params.id})
            .then(async foundUser => {
                foundUser.firstName = request.body.firstName;
                foundUser.lastName = request.body.lastName;
                foundUser.avatar = request.body.avatar;
                foundUser.password = request.body.password;
                foundUser.birthDate = request.body.birthDate;

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
        let userRepository = getRepository(User);
        await userRepository.delete({id: request.params.id})
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
}


export let userController = new UserController();

