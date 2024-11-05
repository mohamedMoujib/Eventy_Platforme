const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); 
const requireAuth = require('../middleware/requireAuth');
const {getMessages,getMessagesById,createMessage,updateMessage,deleteMessage} = require('../controllers/messageController')

// Get all messages
router.get('/', getMessages);

// Get message by ID
router.get('/:id', getMessagesById);

// Create a new message
router.post('/', createMessage);

// Update a message
router.put('/:id', updateMessage);

// Delete a message
router.delete('/:id', deleteMessage);

module.exports = router;
