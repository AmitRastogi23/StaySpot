const User = require("../models/User");

module.exports.getSignup = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.postSignup = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
    });
    let registeration = await User.register(user, req.body.password);
    req.login(registeration, (err) => {
      if (err) {
        next(err);
      }
      req.flash("success", "Welcome to WanderLust!!!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("failure", err.message);
    res.redirect("/user/signup");
  }
};

module.exports.getLogin = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.postLogin = (req, res) => {
  req.flash(
    "success",
    "Welcome to Wanderlust!! You are logged in successfully.",
  );
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.getLogout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "Logged Out Successfully");
    res.redirect("/listings");
  });
};
