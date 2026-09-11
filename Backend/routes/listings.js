const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const {
  isLoggedIn,
  isListingOwner,
  validateListing,
} = require("../middleware");
const listingController = require("../controllers/listings");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router
  .route("/")
  .get(wrapAsync(listingController.index)) // route to show all listings
  .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.create),
  ); // route to add new listing

router
  .route("/:id")
  .get(wrapAsync(listingController.show)) // route to show single listing
  .patch(
    isLoggedIn,
    upload.single("image"),
    isListingOwner,
    validateListing,
    wrapAsync(listingController.update),
  ) // route to update single listing
  .delete(isLoggedIn, isListingOwner, wrapAsync(listingController.delete)); // route to delete a listing

module.exports = router;
