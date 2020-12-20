import "reflect-metadata";
import {createConnection} from "typeorm";

//set the database connection
createConnection();

//Setup the web server
const express = require('express');
const app = express();
app.use(express.json());

//Set routes to middlewares 
import {publicRoutes} from './src/routes/public';
app.use('/', publicRoutes);

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

import {libraryItemRoutes} from './src/routes/libraryItem';
app.use('/', libraryItemRoutes);

import {paymentGatewayRoutes} from './src/routes/paymentGateway';
app.use('/', paymentGatewayRoutes);


//Run server
app.listen(3000, () => {console.log("listening on port 3000...")});