const categoryController = require("../controllers/CategoryController");
const categoryValidator = require('../controllers/validators/CategoryValidator');
//Configure multer for file upload and multipart form-data
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'media/categories');
    }, 
    filename: (request, file, cb) => {
        cb(null, file.originalname);
    }
});


const fileFilter = (request, file, cb) => {
    if(file.mimetype == 'image/jpg' || 
       file.mimetype == 'image/jpeg' || 
       file.mimetype == 'image/png') {

        cb(null, true);
       } else {
           cb({error: true, message: "The uploaded image aren't in the right format. Use jpeg, jpg or png"}, false);
       }
}



//const fields = categoriesImageStorage.fields([{name: 'name', maxCount: 1}, {name: 'description', maxCount: 1}, {name: 'image', maxCount: 1}]);
const upload = multer({storage: storage, fileFilter: fileFilter});

const categoryRoutes = require('express').Router();
const Guard = require('../controllers/middlewares/Guard');

//Apply middlewares
categoryRoutes.use('/api/category', Guard.loggedOnly);

//Category
categoryRoutes.post('/api/category', upload.single('image'),  categoryController.create);
categoryRoutes.get('/api/categories', categoryController.index);
categoryRoutes.get('/api/category/:id', categoryValidator.validate('show'), categoryController.show);
categoryRoutes.put('/api/category/:id', upload.single('image'), categoryValidator.validate('update'), categoryController.update);
categoryRoutes.delete('/api/category/:id/delete', categoryValidator.validate('delete'), categoryController.del);
categoryRoutes.delete('/api/category/:id', categoryValidator.validate('softDelete'), categoryController.softDelete);

module.exports.categoryRoutes = categoryRoutes;
