const subcategoryController = require("../controllers/SubcategoryController");
const subcategoryValidator = require('../controllers/validators/SubcategoryValidator');
const subcategoryRoutes = require('express').Router();

//Subcategory
subcategoryRoutes.post('/api/subcategory', subcategoryValidator.validate('create'), subcategoryController.create);
subcategoryRoutes.get('/api/subcategories/:id', subcategoryController.index);
subcategoryRoutes.get('/api/subcategory/:id', subcategoryValidator.validate('show'), subcategoryController.show);
subcategoryRoutes.put('/api/subcategory/update/:id', subcategoryValidator.validate('update'), subcategoryController.update);
subcategoryRoutes.delete('/api/subcategory/:id/delete', subcategoryValidator.validate('delete'), subcategoryController.del);
subcategoryRoutes.delete('/api/subcategory/:id', subcategoryValidator.validate('softDelete'), subcategoryController.softDelete);

module.exports.subcategoryRoutes = subcategoryRoutes;