const User = require("../models/User");

module.exports.postSignup = async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
    });
    const registration = await User.register(user, req.body.password);
    req.login(registration, (err) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        status: "success",
        message: "Welcome to WanderLust!!!",
        user: {
          id: registration._id,
          username: registration.username,
          email: registration.email,
        },
      });
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.postLogin = (req, res) => {
  let redirectUrl = res.locals.redirectUrl || "/";
  res.status(200).json({
    status: "success",
    message: "Welcome to Wanderlust!! You are logged in successfully.",
    redirectUrl: redirectUrl,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
  });
};

module.exports.getLogout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      status: "success",
      message: "Logged Out Successfully",
    });
  });
};

module.exports.currentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      status: "failure",
      message: "User is not logged in",
    });
  }

  res.status(200).json({
    status: "success",
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
  });
};
