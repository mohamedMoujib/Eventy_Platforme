var express = require('express');
var router = express.Router();
const Log = require('../models/Log');

// Get all logs
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find();
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get log by ID
router.get('/:id', async (req, res) => {
    try {
        const log = await Log.findById(req.params.id);
        if (!log) return res.status(404).json({ message: "Log not found" });
        res.json(log);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new log
router.post('/', async (req, res) => {
    const log = new Log(req.body);
    try {
        const newLog = await log.save();
        res.status(201).json(newLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a log
router.put('/:id', async (req, res) => {
    try {
        const updatedLog = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedLog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a log
router.delete('/:id', async (req, res) => {
    try {
        await Log.findByIdAndDelete(req.params.id);
        res.json({ message: "Log deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
