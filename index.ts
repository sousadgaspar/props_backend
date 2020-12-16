import "reflect-metadata";
import {createConnection} from "typeorm";

//import controllers

import { accountController } from "./src/controllers/AccountController";
import { categoryController } from "./src/controllers/CategoryController";
import { celebrityController } from "./src/controllers/CelebrityController";
import { libraryItemController } from "./src/controllers/LibraryItemController";
import { messageController } from "./src/controllers/MessageController";
import { ocasionController } from "./src/controllers/OcasionController";
import { subcategoryController } from "./src/controllers/SubcategoryController";
import { transactionController } from "./src/controllers/TransactionController";
import { paymentGatewayController } from "./src/controllers/PaymentGatewayController";

//import validators 
import { celebrityValidator } from './src/controllers/validators/celebrityValidator';
import { messageValidator } from './src/controllers/validators/MessageValidator';
import {categoryValidator} from './src/controllers/validators/CategoryValidator';
import {ocasionValidator} from './src/controllers/validators/OcasionValidator';
import {accountValidator} from './src/controllers/validators/AccountValidator';
import {subcategoryValidator} from './src/controllers/validators/SubcategoryValidator';
import {transactionValidator} from './src/controllers/validators/TransactionValidator';
import {libraryItemValidator} from './src/controllers/validators/LibraryItemValidator';

createConnection();

//Setup the server
const express = require('express');
const app = express();
app.use(express.json());
//app.use(expressValidator());

//App routes
app.get('/', (request, response) => {
    response.send("This is the home page");
})

import {userRoutes} from './src/routes/user';
app.use('/', userRoutes);


//celebrity routes
app.post('/api/celebrity', celebrityValidator.validate('create'), celebrityController.create);
app.get('/api/celebrities', celebrityController.index);
app.get('/api/celebrity/:id', celebrityValidator.validate('show'), celebrityController.show);
app.put('/api/celebrity/:id', celebrityValidator.validate('update'), celebrityController.update);
app.delete('/api/celebrity/:id/delete', celebrityValidator.validate('delete'), celebrityController.delete);
app.delete('/api/celebrity/:id', celebrityValidator.validate('softDelete'), celebrityController.softDelete);


//Message routes
app.post('/api/message', messageValidator.validate('create'), messageController.create);
app.get('/api/messages', messageController.index);
app.get('/api/message/:id', messageValidator.validate('show'), messageController.show);
app.put('/api/message/:id', messageValidator.validate('update'), messageController.update);
app.put('/api/changestatus/message/:id', messageController.changeStatus);
app.delete('/api/message/:id/delete', messageValidator.validate('delete'), messageController.delete);
app.delete('/api/message/:id', messageValidator.validate('softDelete'), messageController.softDelete);


//Ocasions routes
//create
app.post('/api/ocasion', ocasionValidator.validate('create'), ocasionController.create);
app.get('/api/ocasions', ocasionController.index);
app.get('/api/ocasion/:id', ocasionValidator.validate('show'), ocasionController.show);
app.put('/api/ocasion/:id', ocasionValidator.validate('update'), ocasionController.update);
app.delete('/api/ocasion/:id/delete', ocasionValidator.validate('delete'), ocasionController.delete);
app.delete('/api/ocasion/:id', ocasionValidator.validate('softDelete'), ocasionController.softDelete);

//Account
app.post('/api/account', accountValidator.validate('create'), accountController.create);
app.get('/api/accounts', accountController.index);
app.get('/api/account/:id', accountValidator.validate('show'), accountController.show);
app.put('/api/account/:id', accountValidator.validate('update'), accountController.update);
app.delete('/api/account/:id/delete', accountValidator.validate('delete'), accountController.delete);
app.delete('/api/account/:id', accountValidator.validate('softDelete'), accountController.softDelete);
app.put('/api/account/:id/credit', accountValidator.validate('credit'), accountController.credit);
app.put('/api/account/:id/debit', accountValidator.validate('debit'), accountController.debit);


//Transaction
app.post('/api/transaction', transactionValidator.validate('create'), transactionController.create);
app.get('/api/transactions', transactionController.index);
app.get('/api/transaction/:id', transactionValidator.validate('show'), transactionController.show);
app.put('/api/transaction/:id', transactionValidator.validate('update'), transactionController.update);
app.delete('/api/transaction/:id/delete', transactionController.delete);
app.delete('/api/transaction/:id', transactionController.softDelete);

//Category
app.post('/api/category', categoryValidator.validate('create'), categoryController.create);
app.get('/api/categories', categoryController.index);
app.get('/api/category/:id', categoryValidator.validate('show'), categoryController.show);
app.put('/api/category/:id', categoryValidator.validate('update'), categoryController.update);
app.delete('/api/category/:id/delete', categoryValidator.validate('delete'), categoryController.delete);
app.delete('/api/category/:id', categoryValidator.validate('softDelete'), categoryController.softDelete);

//Subcategory
app.post('/api/subcategory', subcategoryValidator.validate('create'), subcategoryController.create);
app.get('/api/subcategories/:id', subcategoryController.index);
app.get('/api/subcategory/:id', subcategoryValidator.validate('show'), subcategoryController.show);
app.put('/api/subcategory/update/:id', subcategoryValidator.validate('update'), subcategoryController.update);
app.delete('/api/subcategory/:id/delete', subcategoryValidator.validate('delete'), subcategoryController.delete);
app.delete('/api/subcategory/:id', subcategoryValidator.validate('softDelete'), subcategoryController.softDelete);

//PaymentGateway
app.get('/api/paymentgateway/emis/generatepaymentreference', paymentGatewayController.generatePaymentReference);

//Celebrity library
app.post('/api/library/celebrity/item', libraryItemValidator.validate('create'), libraryItemController.create);
app.get('/api/library/celebrity/items/:id', libraryItemController.index);
app.get('/api/library/celebrity/item/:id', libraryItemValidator.validate('show'), libraryItemController.show);
app.delete('/api/library/celebrity/item/:id/delete', libraryItemValidator.validate('delete'), libraryItemController.delete);
app.delete('/api/library/celebrity/item/:id', libraryItemValidator.validate('softDelete'), libraryItemController.softDelete);


app.listen(3000, () => {console.log("listening on port 3000...")});