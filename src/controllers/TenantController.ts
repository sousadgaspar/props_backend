import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {Tenant} from '../entity/Tenant';
import {validationResult} from 'express-validator';

export async function create (request: Request, response: Response) {

    //Validate the request
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json({errors: errors});
    }

    //populate the tenant object with the request payload
    const tenant = new Tenant();
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
