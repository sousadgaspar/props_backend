const messageValidator = require('../controllers/validators/MessageValidator');
const messageController = require('../controllers/MessageController');
const messageRoutes = require('express').Router();

//Message routes
messageRoutes.post('/api/message', messageValidator.validate('create'), messageController.create);
messageRoutes.get('/api/messages', messageController.index);
messageRoutes.get('/api/message/:id', messageValidator.validate('show'), messageController.show);
messageRoutes.get('/api/user/messages/:id', messageValidator.validate('show'), messageController.userMessages);
messageRoutes.put('/api/message/:id', messageValidator.validate('update'), messageController.update);
messageRoutes.put('/api/changestatus/message/:id', messageController.changeStatus);
messageRoutes.delete('/api/message/:id/delete', messageValidator.validate('delete'), messageController.del);
messageRoutes.delete('/api/message/:id', messageValidator.validate('softDelete'), messageController.softDelete);

module.exports.messageRoutes = messageRoutes;