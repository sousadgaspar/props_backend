import {getRepository} from 'typeorm';
import {Tenant} from './entity/Tenant';

export class Bootstrap {

    async registerTenant () {
        //Validate the request

        let defaultTenant = new Tenant();
        defaultTenant.name = process.env.TENANT_DEFAULT_NAME;
        defaultTenant.description = process.env.TENANT_DEFAULT_DESCRIPTION;
        defaultTenant.currency = process.env.TENANT_DEFAULT_PAYMENT_METHOD;
        defaultTenant.paymentGateways = "EMIS";

        let tenantRepository = getRepository(Tenant);
        await tenantRepository.save(defaultTenant)
            .then(savedTenant => {
                console.log("Bootstraping Tenant");
                console.log(savedTenant);
            })
            .catch(error => {
                console.log("Error saving tenant");
                console.log(error);
            })
    }
}