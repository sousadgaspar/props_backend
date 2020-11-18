import "reflect-metadata";
const express = require('express');
const {v4: uuidv4} = require('uuid');

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

//create
app.post('/api/user', (request, response) => {
    //validate the data
    //save to the database
    //and send the saved data to the client

    response.send({
        id: uuidv4(),
        avatar: request.body.avatar,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password
    });
});
//index
app.get('/api/users', (request, response) => {

    //query the database for all users paginated by some amount of users
    response.send([   
        {id: uuidv4(), firstName: 'Sousa', email: 'sousadgapar@gmail.com', password: uuidv4()},
        {id: uuidv4(), firstName: 'Dumilda', email: 'dumilda@gmail.com', password: uuidv4()},
        {id: uuidv4(), firstName: 'Yorsenia', email: 'yorsenia@gmail.com', password: uuidv4()},
        {id: uuidv4(), firstName: 'Nuelsanio', email: 'nuelsanio@gmail.com', password: uuidv4()},
        {id: uuidv4(), firstName: 'Suzana', email: 'suzana@gmail.com', password: uuidv4()},
        {id: uuidv4(), firstName: 'Zurema', email: 'zurema@gmail.com', password: uuidv4()}
    ])
});

//show
app.get('/api/user/:id', (request, response) => {
    //Query a user by the Id
    response.send("This is the data of unidque user " + request.params.id);
});

//update
app.put('/api/user/:id', (request, response) => {
    //get the user with the :id from the database
    //update the fields
    //save 
    response.send({
        id: request.params.id,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password
    });
});

//delete (softdelete)
app.delete('/api/user/:id/delete', (request, response) => {
    response.send(`The user ${request.params.id} was successfully deleted`);
});

//celebrity routes
//create
app.post('/api/celebrity', (request, response) => {
    response.send({
        id: uuidv4(),
        avatar: request.body.avatar,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
        categoryId: request.body.cateroryId,
        subcategoryId: request.body.subcategoryId,
        description: request.body.description,
        messageResponseTime: request.body.messageResponseTime,
        messagePrice: request.body.messagePrice,
    });
});

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
        id: uuidv4(),
        artistId: uuidv4(),
        item: request.body.item,
        type: request.body.type
    })
});


//Message routes
app.post('/api/message', (request, response) => {
    //validate the message data
    //store in the database
    response.send({
        id: uuidv4(),
        userId: request.body.userId,
        from: request.body.from,
        to: request.body.to,
        celebrityId: request.body.celebrityId,
        ocasionId: request.body.ocasionId,
        instructions: request.body.instructions,
        price: request.body.price,
        createdAt: Date('d-m-Y H:i:s'),
        updatedAt: Date('d-m-Y H:i:s'),
    });
});

//show
app.get('/api/message/:id', (request, response) => {
    //find the message correspondent to the passed id
    response.send({
        id: uuidv4(),
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
        id: uuidv4(),
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
        id: uuidv4(),
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
        id: uuidv4(),
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
        data: [
            {
                id: uuidv4(),
                name: 'carregamento',
                value: 3000,
                messagePrice: 500,
                creditBefore: 3000,
                creditAfter: 2500,
                userId: 3,
                accountId: 5,
                celebrityId: 3,
                messageId: 49,
            },
            {
                id: uuidv4(),
                name: 'carregamento',
                value: 3000,
                messagePrice: 500,
                creditBefore: 3000,
                creditAfter: 2500,
                userId: 3,
                accountId: 5,
                celebrityId: 3,
                messageId: 49,
            }
        ]
    });
})


app.listen(3000, () => {console.log("listening on port 3000...")});