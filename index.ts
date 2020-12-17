import "reflect-metadata";
import {createConnection} from "typeorm";

//import controllers
import { libraryItemController } from "./src/controllers/LibraryItemController";

import { paymentGatewayController } from "./src/controllers/PaymentGatewayController";

//import validators 

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

import {subcategoryRoutes} from './src/routes/subcategory';
app.use('/', subcategoryRoutes);



//PaymentGateway
app.get('/api/paymentgateway/emis/generatepaymentreference', paymentGatewayController.generatePaymentReference);

//Celebrity library
app.post('/api/library/celebrity/item', libraryItemValidator.validate('create'), libraryItemController.create);
app.get('/api/library/celebrity/items/:id', libraryItemController.index);
app.get('/api/library/celebrity/item/:id', libraryItemValidator.validate('show'), libraryItemController.show);
app.delete('/api/library/celebrity/item/:id/delete', libraryItemValidator.validate('delete'), libraryItemController.delete);
app.delete('/api/library/celebrity/item/:id', libraryItemValidator.validate('softDelete'), libraryItemController.softDelete);


app.listen(3000, () => {console.log("listening on port 3000...")});