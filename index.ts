import "reflect-metadata";
import {createConnection} from "typeorm";

//import controllers
import { libraryItemController } from "./src/controllers/LibraryItemController";
import { subcategoryController } from "./src/controllers/SubcategoryController";
import { paymentGatewayController } from "./src/controllers/PaymentGatewayController";

//import validators 
import {subcategoryValidator} from './src/controllers/validators/SubcategoryValidator';
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

import {celebrityRoutes} from './src/routes/celebrity';
app.use('/', celebrityRoutes);

import {messageRoutes} from './src/routes/message';
app.use('/', messageRoutes);

import {ocasionRoutes} from './src/routes/ocasion';
app.use('/', ocasionRoutes);

import {accountRoutes} from './src/routes/account';
app.use('/', accountRoutes);

import {transactionRoutes} from './src/routes/transaction';
app.use('/', transactionRoutes);

import {categoryRoutes} from './src/routes/category';
app.use('/', categoryRoutes);

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