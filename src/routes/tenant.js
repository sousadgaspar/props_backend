const tenantController = require('../controllers/TenantController');
const tenantValidator = require('../controllers/validators/TenantValidator');
const tenantRouter = require('express').Router();



tenantRouter.post('/api/tenant', tenantValidator.validate('create'), tenantController.create);
tenantRouter.get('/api/tenants', tenantController.index);
tenantRouter.get('/api/tenant/:id', tenantValidator.validate('show'), tenantController.show);
tenantRouter.put('/api/tenant/:id', tenantController.update);
tenantRouter.delete('/api/tenant/:id', tenantValidator.validate('softDelete'), tenantController.softDelete);
tenantRouter.delete('/api/tenant/:id/delete', tenantValidator.validate('delete'), tenantController.del);


module.exports.tenantRoutes = tenantRouter;