const ocasionController = require("../controllers/OcasionController");
const ocasionValidator = require('../controllers/validators/OcasionValidator');
const ocasionRoutes = require('express').Router();
const fileUploader = require('../helpers/fileUploader');

//Ocasions routes
//create

ocasionRoutes.post('/api/ocasion', fileUploader.updloadSingle('media/app-icons/ocasion', 'image'), ocasionValidator.validate('create'), ocasionController.create);
ocasionRoutes.get('/api/ocasions', ocasionController.index);
ocasionRoutes.get('/api/ocasion/:id', ocasionValidator.validate('show'), ocasionController.show);
ocasionRoutes.put('/api/ocasion/:id', ocasionValidator.validate('update'), ocasionController.update);
ocasionRoutes.delete('/api/ocasion/:id/delete', ocasionValidator.validate('delete'), ocasionController.del);
ocasionRoutes.delete('/api/ocasion/:id', ocasionValidator.validate('softDelete'), ocasionController.softDelete);

module.exports.ocasionRoutes = ocasionRoutes;