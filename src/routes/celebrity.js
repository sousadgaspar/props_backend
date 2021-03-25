const celebrityController = require("../controllers/CelebrityController");
const celebrityValidator = require('../controllers/validators/celebrityValidator');
const celebrityRoutes = require('express').Router();
const Guard = require('../controllers/middlewares/Guard');

//Configure multer for file upload and multipart form-data
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'media/user-photos');
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
const fileUploader = multer({storage: storage, fileFilter: fileFilter});

//Middlewares
celebrityRoutes.use('/api/celebrity', Guard.adminOnly);

//celebrity routes
celebrityRoutes.post('/api/celebrity', fileUploader.single('image'), celebrityValidator.validate('create'), celebrityController.create);
celebrityRoutes.get('/api/celebrities', celebrityController.index);
celebrityRoutes.get('/api/celebrity/:id', celebrityValidator.validate('show'), celebrityController.show);
celebrityRoutes.put('/api/celebrity/:id', fileUploader.single('image'), celebrityValidator.validate('update'), celebrityController.update);
celebrityRoutes.delete('/api/celebrity/:id/delete', celebrityValidator.validate('delete'), celebrityController.del);
celebrityRoutes.delete('/api/celebrity/:id', celebrityValidator.validate('softDelete'), celebrityController.softDelete);

module.exports.celebrityRoutes = celebrityRoutes;