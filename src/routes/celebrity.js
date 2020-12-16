const celebrityController = require("../controllers/CelebrityController");
const celebrityValidator = require('../controllers/validators/celebrityValidator');
const celebrityRoutes = require('express').Router();


//celebrity routes
celebrityRoutes.post('/api/celebrity', celebrityValidator.validate('create'), celebrityController.create);
celebrityRoutes.get('/api/celebrities', celebrityController.index);
celebrityRoutes.get('/api/celebrity/:id', celebrityValidator.validate('show'), celebrityController.show);
celebrityRoutes.put('/api/celebrity/:id', celebrityValidator.validate('update'), celebrityController.update);
celebrityRoutes.delete('/api/celebrity/:id/delete', celebrityValidator.validate('delete'), celebrityController.del);
celebrityRoutes.delete('/api/celebrity/:id', celebrityValidator.validate('softDelete'), celebrityController.softDelete);

module.exports.celebrityRoutes = celebrityRoutes;