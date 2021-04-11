const tenantController = require('../controllers/TenantController');
const tenantValidator = require('../controllers/validators/TenantValidator');
const tenantRouter = require('express').Router();



tenantRouter.post('/api/tenant', tenantValidator.validate('create'), tenantController.create);


module.exports.tenantRoutes = tenantRouter;