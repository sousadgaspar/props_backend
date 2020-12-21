const userValidator = require("../controllers/validators/UserValidator");
const userController = require('../controllers/UserController');
const userRoutes = require('express').Router();

/*********************************************************/
// API Endpoints            
/*********************************************************/
//User routes

//Business logic
userRoutes.post('/api/register', userController.register);
userRoutes.post('/api/login', userController.login);
userRoutes.post('/api/user/onboard', userController.onboard);

//Standard
userRoutes.post('/api/user', userValidator.validate('create'), userController.create);
userRoutes.get('/api/users', userController.index);
userRoutes.get('/api/user/:id', userValidator.validate('show'), userController.show);
userRoutes.put('/api/user/:id', userValidator.validate('update'), userController.update);
userRoutes.delete('/api/user/:id/delete', userValidator.validate('delete'), userController.del);
userRoutes.delete('/api/user/:id', userValidator.validate('softDelete'), userController.softDelete);

module.exports.userRoutes = userRoutes;