const express = require("express");
const router = express.Router();

const User = require("../models/User");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");

router
  .route("/signup")
  .get(userController.getSignup)
  .post(wrapAsync(userController.postSignup));

router
  .route("/login")
  .get(userController.getLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.postLogin,
  );

// route for logout user
router.get("/logout", userController.getLogout);

module.exports = router;
