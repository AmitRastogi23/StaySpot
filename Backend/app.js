require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const db_URL = process.env.ATLASDB_URL;

const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
const ExpressError = require("./utils/ExpressError");

const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const store = MongoStore.create({
  mongoUrl: db_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", (err) => {
  console.log("error in mongo session store", err);
});
const sessionOption = session({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
});
app.use(sessionOption);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const listingRouter = require("./routes/listings");
const reviewRouter = require("./routes/reviews");
const userRouter = require("./routes/users");

async function main() {
  await mongoose.connect(db_URL);
}
main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log("connection unsuccesfull");
    console.log(err);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// middleware to add flash messages in res.local
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  res.locals.currUser = req.user;
  next();
});

app.use("/api/listings", listingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/user", userRouter);

// Handling requests to invalid pages
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!!"));
});

// middleware to handle all errors
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({
    status: "failure",
    message,
  });
});
