const messageValidator = require('../controllers/validators/MessageValidator');
const messageController = require('../controllers/MessageController');
const messageRoutes = require('express').Router();

//Configure multer for file upload and multipart form-data
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'media/video-messages');
    }, 
    filename: (request, file, cb) => {
        cb(null, file.originalname);
    }
});


const fileFilter = (request, file, cb) => {
    if(file.mimetype == 'video/mp4' || 
       file.mimetype == 'application/x-mpegURL' || 
       file.mimetype == 'video/MP2T' || 
       file.mimetype == 'video/3gpp' || 
       file.mimetype == 'video/quicktime' || 
       file.mimetype == 'video/x-ms-wmv' || 
       file.mimetype == 'video/x-msvideo') {

        cb(null, true);
       } else {
           cb({error: true, message: "The uploaded video isn't in the right format. Use .mp4, .avi, .mov or wmv"}, false);
       }
}


//const fields = categoriesImageStorage.fields([{name: 'name', maxCount: 1}, {name: 'description', maxCount: 1}, {name: 'image', maxCount: 1}]);
const upload = multer({storage: storage, fileFilter: fileFilter});


//Message routes
messageRoutes.post('/api/message', messageValidator.validate('create'), messageController.create);
messageRoutes.get('/api/messages', messageController.index);
messageRoutes.get('/api/message/:id', messageValidator.validate('show'), messageController.show);
messageRoutes.get('/api/user/messages/:id', messageValidator.validate('show'), messageController.userMessages);
messageRoutes.put('/api/message/:id', messageValidator.validate('update'), messageController.update);
messageRoutes.put('/api/changestatus/message/:id', messageController.changeStatus);
messageRoutes.delete('/api/message/:id/delete', messageValidator.validate('delete'), messageController.del);
messageRoutes.delete('/api/message/:id', messageValidator.validate('softDelete'), messageController.softDelete);


//Business Model Routes
messageRoutes.post('/api/message/video/upload/:id', upload.single("video-message"), messageValidator.validate('uploadVideoMessage'), messageController.uploadVideoMessage);

module.exports.messageRoutes = messageRoutes;