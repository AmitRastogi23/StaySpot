const express = require("express");
const router = express.Router();

const User = require("../models/User");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");

router.route("/signup").post(wrapAsync(userController.postSignup));

router.route("/login").post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failWithError: true,
  }),
  userController.postLogin,
);

// route for logout user
router.get("/logout", userController.getLogout);

// route to check current logged in user
router.get("/current", wrapAsync(userController.currentUser));

module.exports = router;
