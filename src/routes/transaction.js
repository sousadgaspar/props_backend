const  transactionController = require("../controllers/TransactionController");
const transactionValidator = require('../controllers/validators/TransactionValidator');
const transactionRoutes = require('express').Router();

//Transaction
transactionRoutes.post('/api/transaction', transactionValidator.validate('create'), transactionController.create);
transactionRoutes.get('/api/transactions', transactionController.index);
transactionRoutes.get('/api/transaction/:id', transactionValidator.validate('show'), transactionController.show);
transactionRoutes.put('/api/transaction/:id', transactionValidator.validate('update'), transactionController.update);
transactionRoutes.delete('/api/transaction/:id/delete', transactionController.del);
transactionRoutes.delete('/api/transaction/:id', transactionController.softDelete);

module.exports.transactionRoutes = transactionRoutes;
