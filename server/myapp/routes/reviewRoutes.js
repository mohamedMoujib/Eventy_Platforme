var express = require('express');
var router = express.Router();
const Review = require('../models/Review');
const {getReviews,getReviewByid, createReview,updateReview,deleteReview}=require('../controllers/reviewController')
// Get all reviews
router.get('/', getReviews);

// Get review by ID
router.get('/:id', getReviewByid);

// Create a new review
router.post('/', createReview);

// Update a review
router.put('/:id', updateReview);

// Delete a review
router.delete('/:id', deleteReview);

module.exports = router;
