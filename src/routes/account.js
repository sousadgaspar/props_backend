const accountValidator = require("../controllers/validators/AccountValidator");
const  accountController  = require("../controllers/AccountController");
const accountRoutes = require('express').Router();
const Guard = require('../controllers/middlewares/Guard');

//Middlewares
accountRoutes.use('/api/account', Guard.loggedOnly);
accountRoutes.use('/api/accounts', Guard.loggedOnly);
accountRoutes.use('/api/account/:id', Guard.loggedOnly);
accountRoutes.use('/api/account/:id/delete', Guard.loggedOnly);
accountRoutes.use('/api/account/:id/credit', Guard.loggedOnly);
accountRoutes.use('/api/account/:id/debit', Guard.loggedOnly);

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