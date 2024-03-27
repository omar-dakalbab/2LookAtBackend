const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/messageController');
const { authenticateUser } = require('../middleware/authentication');

// Routes for handling message operations
router.post('/send', authenticateUser, messageController.sendMessage);
router.get('/inbox', authenticateUser, messageController.getMessages);
router.delete('/:messageId', authenticateUser, messageController.deleteMessage);

module.exports = router;