var express = require('express');
var router = express.Router();
const Favorite = require('../models/Favorite');

// Get all favorites
router.get('/', async (req, res) => {
    try {
        const favorites = await Favorite.find();
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get favorite by ID
router.get('/:id', async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (!favorite) return res.status(404).json({ message: "Favorite not found" });
        res.json(favorite);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new favorite
router.post('/', async (req, res) => {
    const favorite = new Favorite(req.body);
    try {
        const newFavorite = await favorite.save();
        res.status(201).json(newFavorite);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a favorite
router.put('/:id', async (req, res) => {
    try {
        const updatedFavorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedFavorite);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a favorite
router.delete('/:id', async (req, res) => {
    try {
        await Favorite.findByIdAndDelete(req.params.id);
        res.json({ message: "Favorite deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
