const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); 
const requireAuth = require('../middleware/requireAuth');
const paginate = require('../utils/paginate')


// Get all messages
const getMessages = async (req, res) => {
    try {
        const result = await paginate(Message,req);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get message by ID
const getMessagesById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ message: "Message not found" });
        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Create a new message
const createMessage = async (req, res) => {
    const message = new Message(req.body);
    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Update a message
const updateMessage =  async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMessage) return res.status(404).json({ message: "Message not found for update" });
        console.log("Updated Message Data:", updatedMessage);
        res.json(updatedMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Delete a message
const deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) return res.status(404).json({ message: "Message not found for deletion" });
        res.json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getMessages,
    getMessagesById,
    createMessage,
    updateMessage,
    deleteMessage
}
