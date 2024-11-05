var express = require('express');
var router = express.Router();
const Review = require('../models/Review');

// Get all reviews
const getReviews =  async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get review by ID
const getReviewByid =  async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Create a new review
const createReview =  async (req, res) => {
    const review = new Review(req.body);
    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Update a review
const updatedReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Delete a review
const deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: "Review deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getReviews,
    getReviewByid,
    createReview,
    updatedReview,
    deleteReview
};
