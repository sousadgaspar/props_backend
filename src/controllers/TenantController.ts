import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Tenant} from '../entity/Tenant';
import {validationResult} from 'express-validator';

//tenant instance for all functions
const tenant = new Tenant();

export async function create (request: Request, response: Response) {

    //Validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }

    //populate the tenant object with the request payload
    tenant.name = request.body.name;
    tenant.description = request.body.description;
    tenant.currency = request.body.currency;
    tenant.paymentGateways = request.body.paymentGateways;

    const tenantRepository = getRepository(Tenant);

    await tenantRepository.save(tenant)
        .then(savedTenant => {
            console.log(":::::Saving tenant:::::::::" + JSON.stringify(savedTenant))
            return response.status(200).send(savedTenant);
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


export async function index (request: Request, response: Response) {

    const tenantRepository = getRepository(Tenant);
    await tenantRepository.find(tenant)
        .then(foundTenants => {
            console.log(":::::::::: FOUND TENANTS ::::::::::::::    " + JSON.stringify(foundTenants));
            response.status(200).send(foundTenants);
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


export async function show (request: Request, response: Response) {

    const tenantRepository = getRepository(Tenant);
    tenantRepository.findOne({id: request.params.id})
        .then(foundTenant => {
            console.log(":::::::::::    FOUND TENANT    ::::::::::::::: " + JSON.stringify(foundTenant))
            response.status(200).send(foundTenant);
        })
        .catch(error => {
            console.log(":::::::::::    ERROR FINDING TENANT    ::::::::::::::: " + JSON.stringify(error))
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
            });
        });
}


export async function update (request: Request, response: Response) {

    const tenantRepository = getRepository(Tenant);
    const foundTenant = await tenantRepository.findOne({id: request.params.id});
    if(request.body.name) foundTenant.name = request.body.name;
    if(request.body.description) foundTenant.description = request.body.description;
    if(request.body.currency) foundTenant.currency = request.body.currency;
    if(request.body.paymentGateways) foundTenant.paymentGateways = request.body.paymentGateways;

    await tenantRepository.save(foundTenant)
                .then(savedTenant => {
                    console.log(":::::::::::    SAVING TENANT    ::::::::::::::: " + JSON.stringify(savedTenant));
                    return response.status(200).send(savedTenant);
                })
                .catch(error => {

                    console.log(":::::::::::    ERROR SAVING UPDATED TENANT    ::::::::::::::: " + JSON.stringify(error));

                    return response.status(500).send({
                        errorName: error.name,
                        errorMessage: error.message,
                        errorNumber: error.errno,
                        errorCode: error.code,
                        sqlMessage: error.sqlMessage,
                    });
                });
}


export async function del(request: Request, response: Response) {

    const tenantRepository = getRepository(Tenant);
        tenantRepository.delete({id: request.params.id})
            .then(affectedRows => {
                console.log(":::::::::::    DELETING TENANT    ::::::::::::::: " + JSON.stringify(affectedRows));
                return response.status(200).send(affectedRows);
            })
            .catch(error => {
                console.log(":::::::::::    ERROR DELETING TENANT    ::::::::::::::: " + JSON.stringify(error));
                return response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                });
            });
}


export async function softDelete(request: Request, response: Response) {

    const tenantRepository = getRepository(Tenant);
        tenantRepository.softDelete({id: request.params.id})
            .then(affectedRows => {
                console.log(":::::::::::    DELETING TENANT    ::::::::::::::: " + JSON.stringify(affectedRows));
                return response.status(200).send(affectedRows);
            })
            .catch(error => {
                console.log(":::::::::::    ERROR DELETING TENANT    ::::::::::::::: " + JSON.stringify(error));
                return response.status(500).send({
                    errorName: error.name,
                    errorMessage: error.message,
                    errorNumber: error.errno,
                    errorCode: error.code,
                    sqlMessage: error.sqlMessage,
                });
            });
}