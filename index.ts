import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import { celebrityController } from "./src/controllers/CelebrityController";

createConnection();

//get the entities
import {userController} from './src/controllers/UserController';

import { Category } from './src/entity/Category';
let category = new Category();
import { Subcategory } from './src/entity/Subcategory';

//Server configuration
const express = require('express');
const app = express();
app.use(express.json());

//App routes
app.get('/', (request, response) => {
    response.send("This is the home page");
})



/*********************************************************/
// API Endpoints            
/*********************************************************/
//User routes

app.post('/api/user', userController.create);
app.get('/api/users', userController.index);
app.get('/api/user/:id', userController.show);
app.put('/api/user/:id', userController.update);
app.delete('/api/user/:id/delete', userController.delete);

//celebrity routes
//create
app.post('/api/celebrity', celebrityController.create);

//show
app.get('/api/celebrity/:id', (request, response) => {
    //get the cebrity from the database using the id passed on the endpoint
    response.send({
        id: request.params.id,
        //...
        createAt: Date(),
        updateAt: Date()
    });
});

//update
app.put('/api/celebrity/:id', (request, response) => {
    //validate data passed in the body request
    //get the object from the database
    response.send({
        id: request.params.id,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        createdAt: Date(),
        updatedAt: Date(),
    });
});

//delete
app.delete('/api/celebrity/:id/delete', (request, response) => {
    response.send(`The celebrity with the user ID ${request.params.id} was deleted successfully`);
});


//celebrity library
app.post('/api/celebrity/library/item', (request, response) => {
    //save photo or video with the celebrity ID

    response.send({
        item: request.body.item,
        type: request.body.type
    })
});


//Message routes
app.post('/api/message', (request, response) => {
    //validate the message data
    //store in the database
    response.send({
        userId: request.body.userId,
        from: request.body.from,
        to: request.body.to,
        celebrityId: request.body.celebrityId,
        ocasionId: request.body.ocasionId,
        instructions: request.body.instructions,
        price: request.body.price,
        createdAt: Date(),
        updatedAt: Date(),
    });
});

//show
app.get('/api/message/:id', (request, response) => {
    //find the message correspondent to the passed id
    response.send({
        instructions: "Hi, Me and Dumilda are very fans of yours. Unfortunatelly I betrayed her. Please, record a message telling her I love her so much, and I never going to meet any other woman again.",
        createdAt: Date(),
        updatedAt: Date(),
    })
});


//update
app.put('/api/message/:id', (request, response) => {
    //validate the request data
    //find the messga object to update
    response.send({
        id: request.params.id,
        from: request.body.from,
        to: request.body.to,
        ocasionId: request.body.ocasionId,
        instructions: request.body.instructions,
    });
});

//delete
app.delete('/api/message/:id/delete', (request, response) => {
    //find the object to delete
    //delete
    response.send({
        id: request.params.id,
        result: 'success'
    })
});

//Ocasions routes
//create
app.post('/api/ocasion', (request, response) => {
    //validate the request data
    //store in the database
    response.send({
        name: request.body.name,
        description: request.body.description
    }); 
});
//show
app.get('/api/ocasion/:id', (request, response) => {
    //find the ocasion object instance
    response.send({
        id: request.params.id,
        name: "Aniversario",
        description: "A data mais celebrada na vida do ser humano",
    });
});


//update
app.put('/api/ocasion/:id', (request, response) => {
    //find the ocasion instance
    //update data
    response.send({
        id: request.params.id,
        name: request.body.name,
        description: request.body.description
    });
});

//delete
app.delete('/api/ocasion/:id/delete', (request, response) => {
    //fetch the ocasion object based on the id
    //update the status to deleted
    response.send({
        id: request.params.id,
        result: 'success'
    });
});

//Account
app.post('/api/account', (request, response) => {
    //validate the request data
    //store the validated data
    response.send({
        credit: 0,
        bankName: request.body.bankName,
        bankAccountNumber: request.body.bankAccountNumber,
        bankAccountIBAN: request.body.bankAccountIBAN,
    });
});

//show
app.get('/api/account/:id', (request, response) => {
    //fetch the account from database
    response.send({
        id: request.params.id,
        value: 3000,
        bankName: "BAI",
        bankAccountNumber: '00103988929',
        bankAccountIBAN: '0055000023432492831019',
        userId: 5
    });
});

//update
app.put('/api/account/:id', (request, response) => {
    //fetch the account object data
    //validate de request
    //update the fields
    response.send({
        id: request.params.id,
        bankName: request.body.bankName,
        bankAccountNumber: request.body.bankAccountNumber,
        bankAccountIBAN: request.body.bankAccountIBAN,
    });
});

//delete
app.delete('/api/account/:id/delete', (request, response) => {
    //fetch the object
    //delete
    response.send({
        id: request.params.id,
        result: 'success'
    });
});


//credit
app.put('/api/account/:id/credit', (request, response) => {
    //fetch the account
    let account = {
        value: 3000,
    }
    //update the account value
    account.value += Number(request.body.valueToAdd);

    //return the new credit
    response.send({
        id: request.params.id,
        value: account.value
    });

});

//debit
app.put('/api/account/:id/debit', (request, response) => {
    //fetch the account
    let account = {
        value: 0,
    }
    //update the account value
    account.value -= Number(request.body.valueToAdd);

    //return the new credit
    response.send({
        id: request.params.id,
        value: account.value
    });

});


//Transaction
//create
app.post('/api/transaction', (request, response) => {
    //validate the data
    //create the transaction
    response.send({
        name: 'carregamento',
        value: 3000,
        messagePrice: 500,
        creditBefore: 3000,
        creditAfter: 2500,
        userId: 3,
        accountId: 5,
        celebrityId: 3,
        messageId: 49,
    });
});


//show
app.get('/api/transaction/:id', (request, response) => {
    //fetch the Transaction data from database based on the Id
    response.send({
        id: request.params.id,
        name: 'carregamento',
        value: 3000,
        messagePrice: 500,
        creditBefore: 3000,
        creditAfter: 2500,
        userId: 3,
        accountId: 5,
        celebrityId: 3,
        messageId: 49,
    });
});

//index
app.get('/api/transactions', (request, response) => {
    //fetch all transactions register based on limit passed on param perPage
    response.send({
        perPage: request.query.perPage,
        pages: 3,//ceil(count(allregisters)/perPage)
        //some more metadata
    });
})


app.post('/api/category', async (request, response) => {
    let categoryRepository = getRepository(Category);

    category.name = request.body.name;
    category.description = request.body.description;

    await categoryRepository.save(category)
        .then(value => {
            response.status(200).send(value);
        })
        .catch(error => {
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
            })
        });
});

app.get('/api/categories', async (request, response) => {

    await getRepository(Category).find(category)
        .then( fectchedCategories => {
            console.log(fectchedCategories);
            response.status(200).send(fectchedCategories);
        })
        .catch(error => {
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
            })
        });

})


app.post('/api/celebrity/subcategory', async (request, response) => {
    let subcategoryRepository = getRepository(Subcategory);
    let subcategory = new Subcategory();
    subcategory.name = request.body.name;
    subcategory.categoryId = request.body.categoryId;
    subcategory.description = request.body.description;

    await subcategoryRepository.save(subcategory)
        .then( value => {
            response.status(200).send(value);
        })
        .catch(error => {
            response.status(500).send({
                errorName: error.name,
                errorMessage: error.message,
                errorNumber: error.errno,
                errorCode: error.code,
                sqlMessage: error.sqlMessage,
            })
        });
});


app.listen(3000, () => {console.log("listening on port 3000...")});