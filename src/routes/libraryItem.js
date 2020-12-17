const  libraryItemController  = require("../controllers/LibraryItemController");
const libraryItemValidator = require('../controllers/validators/LibraryItemValidator');
const libraryItemRoutes = require('express').Router();

//Celebrity library
libraryItemRoutes.post('/api/library/celebrity/item', libraryItemValidator.validate('create'), libraryItemController.create);
libraryItemRoutes.get('/api/library/celebrity/items/:id', libraryItemController.index);
libraryItemRoutes.get('/api/library/celebrity/item/:id', libraryItemValidator.validate('show'), libraryItemController.show);
libraryItemRoutes.delete('/api/library/celebrity/item/:id/delete', libraryItemValidator.validate('delete'), libraryItemController.del);
libraryItemRoutes.delete('/api/library/celebrity/item/:id', libraryItemValidator.validate('softDelete'), libraryItemController.softDelete);

module.exports.libraryItemRoutes = libraryItemRoutes;