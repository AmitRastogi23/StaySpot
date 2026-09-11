const Listing = require("./models/Listing");
const Review = require("./models/reviews");
const { listingSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      status: "failure",
      message: "Please login before creating a listing.",
    });
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isListingOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({
      status: "failure",
      message: "Listing not found.",
    });
  }
  if (!listing.owner.equals(req.user._id)) {
    return res.status(403).json({
      status: "failure",
      message: "You don't have permission for this action.",
    });
  }
  next();
};

module.exports.isReviewOwner = async (req, res, next) => {
  let { id2 } = req.params;
  const review = await Review.findById(id2);
  if (!review) {
    return res.status(404).json({
      status: "failure",
      message: "Review not found.",
    });
  }
  if (!review.author.equals(req.user._id)) {
    return res.status(403).json({
      status: "failure",
      message: "You cannot delete this review.",
    });
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMSg = error.details.map((el) => el.message).join(",");
    return res.status(400).json({
      status: "failure",
      message: errMSg,
    });
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMSg = error.details.map((el) => el.message).join(",");
    return res.status(400).json({
      status: "failure",
      message: errMSg,
    });
  }
  next();
};
