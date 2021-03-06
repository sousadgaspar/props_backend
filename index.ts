import "reflect-metadata";
import {createConnection} from "typeorm";
const path = require('path');
import {Bootstrap} from './src/bootstrap';

let connectionStablished = false;
//set the database connection
createConnection()
    .then(() => {
        connectionStablished = true;
        (new Bootstrap()).registerTenant();
    })
    .catch(error => {
        connectionStablished = false;
        console.log(":::::::::::::Connection was not established. Aborting system start:::::::::::::::::::::::")
        console.log(error);
    })

//Setup the web server
const express = require('express');
const app = express();
app.use(express.static('media'));
app.use(express.json());
//Require multer for ectype multipart/form-data
const multer = require('multer');
//app.use(multer.array());

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

import {paymentGatewayRoutes} from './src/routes/paymentgateway';
app.use('/', paymentGatewayRoutes);

import {tenantRoutes} from './src/routes/tenant';
app.use('/', tenantRoutes);


//Run server
app.listen(process.env.PORT, () => {console.log("listening on port " + process.env.PORT + '...')});