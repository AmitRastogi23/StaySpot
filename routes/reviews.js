const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isReviewOwner, validateReview } = require("../middleware");
const reviewController = require("../controllers/reviews");

// add review
router.post( 
  "/:id/new",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.add),
);

// delete review route
router.delete(
  "/:id/:id2",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(reviewController.delete),
);

module.exports = router;
