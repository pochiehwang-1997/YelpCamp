const express = require("express");
const router = express.Router({mergeParams:true});
const reviews = require("../controllers/reviews")
const catchAsync = require("../utils/catchAsync");
const {validateReview,isLoggedin, isReviewAuthor} = require("../middleware")


//Reviews
router.post('/', isLoggedin, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedin, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;