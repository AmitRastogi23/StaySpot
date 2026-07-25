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
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index)) // index route
  .post(
    isLoggedIn,
    validateListing,
    upload.single("image"),
    wrapAsync(listingController.create),
  ); // create route

// new route
router.get("/new", isLoggedIn, listingController.new);

router
  .route("/:id")
  .get(wrapAsync(listingController.show)) //show route
  .patch(
    // update route
    isLoggedIn,
    isListingOwner,
    validateListing,
    upload.single("image"),
    wrapAsync(listingController.update),
  )
  .delete(isLoggedIn, isListingOwner, wrapAsync(listingController.delete)); // delete route

// edit route
router.get(
  "/:id/update",
  isLoggedIn,
  isListingOwner,
  wrapAsync(listingController.edit),
);

module.exports = router;
