const userValidator = require("../controllers/validators/UserValidator");
const userController = require('../controllers/UserController');
const userRoutes = require('express').Router();
const Guard = require('../controllers/middlewares/Guard');
const fileUploader = require('../helpers/fileUploader');

/*********************************************************/
// API Endpoints            
/*********************************************************/
//User routes

//middlewares
userRoutes.use('/api/users', Guard.loggedOnly);
userRoutes.use('/api/user:id', Guard.loggedOnly);
userRoutes.use('/api/user:id', Guard.loggedOnly);
userRoutes.use('/api/user/:id/delete', Guard.loggedOnly);
userRoutes.use('/api/user/:id', Guard.loggedOnly);

//Business logic
userRoutes.post('/api/register', userController.register);
userRoutes.post('/api/login',  userController.login);
userRoutes.post('/api/user/onboard', userController.onboard);//method not implemented
userRoutes.get('/api/user/messages/:id', userController.messages);

//Standard
userRoutes.post('/api/user', fileUploader.updloadSingle('media/user-photos', 'image'), userValidator.validate('create'), userController.create);
userRoutes.get('/api/users', userController.index);
userRoutes.get('/api/user/:id', userValidator.validate('show'), userController.show);
userRoutes.put('/api/user/:id', userValidator.validate('update'), userController.update);
userRoutes.delete('/api/user/:id/delete', userValidator.validate('delete'), userController.del);
userRoutes.delete('/api/user/:id', userValidator.validate('softDelete'), userController.softDelete);

module.exports.userRoutes = userRoutes;