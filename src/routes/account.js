const accountValidator = require("../controllers/validators/AccountValidator");
const  accountController  = require("../controllers/AccountController");
const accountRoutes = require('express').Router();

//Account
accountRoutes.post('/api/account', accountValidator.validate('create'), accountController.create);
accountRoutes.get('/api/accounts', accountController.index);
accountRoutes.get('/api/account/:id', accountValidator.validate('show'), accountController.show);
accountRoutes.put('/api/account/:id', accountValidator.validate('update'), accountController.update);
accountRoutes.delete('/api/account/:id/delete', accountValidator.validate('delete'), accountController.del);
accountRoutes.delete('/api/account/:id', accountValidator.validate('softDelete'), accountController.softDelete);
accountRoutes.put('/api/account/:id/credit', accountValidator.validate('credit'), accountController.credit);
accountRoutes.put('/api/account/:id/debit', accountValidator.validate('debit'), accountController.debit);

module.exports.accountRoutes = accountRoutes;