const categoryController = require("../controllers/CategoryController");
const categoryValidator = require('../controllers/validators/CategoryValidator');

const categoryRoutes = require('express').Router();
const Guard = require('../controllers/middlewares/Guard');

//Apply middlewares
categoryRoutes.use('/api/category', Guard.loggedOnly);

//Category
categoryRoutes.post('/api/category', categoryValidator.validate('create'), categoryController.create);
categoryRoutes.get('/api/categories', categoryController.index);
categoryRoutes.get('/api/category/:id', categoryValidator.validate('show'), categoryController.show);
categoryRoutes.put('/api/category/:id', categoryValidator.validate('update'), categoryController.update);
categoryRoutes.delete('/api/category/:id/delete', categoryValidator.validate('delete'), categoryController.del);
categoryRoutes.delete('/api/category/:id', categoryValidator.validate('softDelete'), categoryController.softDelete);

module.exports.categoryRoutes = categoryRoutes;