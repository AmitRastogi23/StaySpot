const Listing = require("./models/Listing");
const Review = require("./models/reviews");
const { listingSchema , reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("failure", "Please login before creating a listing.");
    return res.redirect("/user/login");
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
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("failure", "You don't have permission for this action.");
    res.redirect(`/listings/${id}`);
  } else {
    next();
  }
};

module.exports.isReviewOwner = async (req, res, next) => {
  let { id, id2 } = req.params;
  const review = await Review.findById(id2);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("failure", "You cannot delete this review");
    res.redirect(`/listings/${id}`);
  } else {
    next();
  }
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMSg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMSg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    console.log(errMsg + " " + error);
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
