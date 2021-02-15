const multer = require('multer');

const updloadSingle = (path, imageName) => {
    const storage = multer.diskStorage({
        destination: (request, file, cb) => {
            cb(null, path);
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

    return multer({storage: storage, fileFilter: fileFilter}).single(imageName)
};

module.exports.updloadSingle = updloadSingle;