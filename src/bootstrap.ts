import {getRepository} from 'typeorm';
import {Tenant} from './entity/Tenant';

export class Bootstrap {

    async registerTenant () {

        let defaultTenant = new Tenant();
        defaultTenant.name = process.env.TENANT_DEFAULT_NAME;
        defaultTenant.description = process.env.TENANT_DEFAULT_DESCRIPTION;
        defaultTenant.currency = process.env.TENANT_DEFAULT_CURRENCY;
        defaultTenant.paymentGateways = process.env.TENANT_DEFAULT_PAYMENT_METHOD;

        const tenantRepository = getRepository(Tenant);
        await tenantRepository.find()
            .then(async foundTenant => {
                if(foundTenant.length == 0) {
                    console.log(":::::::::  NO TENANT FOUND ::::::::::::: " + JSON.stringify(foundTenant));

                    await tenantRepository.save(defaultTenant)
                    .then(savedTenant => {
                        console.log(":::::::::  NEWLLY CREATED TENANT ::::::::::::: " + JSON.stringify(savedTenant));
                    })
                    .catch(error => {
                        console.log(":::::::::  ERROR CREATING TENANT ::::::::::::: " + JSON.stringify(error));
                    });
                } else {
                    console.log(":::::::::  FOUND " + foundTenant.length + " TENANTS ::::::::::::: " + JSON.stringify(foundTenant));
                }
            }) 
    }
}