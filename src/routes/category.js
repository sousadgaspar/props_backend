const categoryController = require("../controllers/CategoryController");
const categoryValidator = require('../controllers/validators/CategoryValidator');
//Configure multer for file upload and multipart form-data
const multer = require('multer');
const categoriesImageStorage = multer({storage: 'media/categories'});
//const fields = categoriesImageStorage.fields([{name: 'name', maxCount: 1}, {name: 'description', maxCount: 1}, {name: 'image', maxCount: 1}]);

const categoryRoutes = require('express').Router();
const Guard = require('../controllers/middlewares/Guard');

//Apply middlewares
categoryRoutes.use('/api/category', Guard.loggedOnly);

//Category
categoryRoutes.post('/api/category', categoriesImageStorage.single('image'),  categoryController.create);
categoryRoutes.get('/api/categories', categoryController.index);
categoryRoutes.get('/api/category/:id', categoryValidator.validate('show'), categoryController.show);
categoryRoutes.put('/api/category/:id', categoryValidator.validate('update'), categoryController.update);
categoryRoutes.delete('/api/category/:id/delete', categoryValidator.validate('delete'), categoryController.del);
categoryRoutes.delete('/api/category/:id', categoryValidator.validate('softDelete'), categoryController.softDelete);

module.exports.categoryRoutes = categoryRoutes;