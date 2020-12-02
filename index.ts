import "reflect-metadata";
import {createConnection} from "typeorm";
import {categoryValidator} from './src/controllers/validators/CategoryValidator';
import {ocasionValidator} from './src/controllers/validators/OcasionValidator';

//import controllers
import {userController} from './src/controllers/UserController';
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
import { userValidator } from "./src/controllers/validators/UserValidator";
import { celebrityValidator } from './src/controllers/validators/celebrityValidator';
import { messageValidator } from './src/controllers/validators/MessageValidator';

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


/*********************************************************/
// API Endpoints            
/*********************************************************/
//User routes

app.post('/api/user', userValidator.validate('create'), userController.create);
app.get('/api/users', userController.index);
app.get('/api/user/:id', userValidator.validate('show'), userController.show);
app.put('/api/user/:id', userValidator.validate('update'), userController.update);
app.delete('/api/user/:id/delete', userValidator.validate('delete'), userController.delete);
app.delete('/api/user/:id', userValidator.validate('softDelete'), userController.softDelete);

//celebrity routes
app.post('/api/celebrity', celebrityValidator.validate('create'), celebrityController.create);
app.get('/api/celebrities', celebrityController.index);
app.get('/api/celebrity/:id', celebrityValidator.validate('show'), celebrityController.show);
app.put('/api/celebrity/:id', celebrityValidator.validate('update'), celebrityController.update);
app.delete('/api/celebrity/:id/delete', celebrityValidator.validate('delete'), celebrityController.delete);
app.delete('/api/celebrity/:id', celebrityValidator.validate('softDelete'), celebrityController.softDelete);


//Celebrity library
app.post('/api/library/item', libraryItemController.create);
app.get('/api/library/items', libraryItemController.index);
app.get('/api/library/item/:id', libraryItemController.show);
app.put('/api/library/item/:id', libraryItemController.update);
app.delete('/api/library/item/:id/delete', libraryItemController.delete);
app.delete('/api/library/item/:id', libraryItemController.softDelete);


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
app.post('/api/account', accountController.create);
app.get('/api/accounts', accountController.index);
app.get('/api/account/:id', accountController.show);
app.put('/api/account/:id', accountController.update);
app.delete('/api/account/:id/delete', accountController.delete);
app.delete('/api/account/:id', accountController.softDelete);
app.put('/api/account/:id/credit', accountController.credit);
app.put('/api/account/:id/debit', accountController.debit);


//Transaction
app.post('/api/transaction', transactionController.create);
app.get('/api/transactions', transactionController.index);
app.get('/api/transaction/:id', transactionController.show);
app.put('/api/transaction/:id', transactionController.update);
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
app.post('/api/subcategory', subcategoryController.create);
app.get('/api/subcategories/:id', subcategoryController.index);
app.get('/api/subcategory/:id', subcategoryController.show);
app.put('/api/subcategory/update/:id', subcategoryController.update);
app.delete('/api/subcategory/:id/delete', subcategoryController.delete);
app.delete('/api/subcategory/:id', subcategoryController.softDelete);

//PaymentGateway
app.get('/api/paymentgateway/emis/generatepaymentreference', paymentGatewayController.generatePaymentReference)


app.listen(3000, () => {console.log("listening on port 3000...")});