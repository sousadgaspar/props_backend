const publicRoutes = require('express').Router();

//App routes
publicRoutes.get('/', (request, response) => {
    response.send("This is the home page");
})

module.exports.publicRoutes = publicRoutes;