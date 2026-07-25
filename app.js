// if(process.env.NODE_ENV != "production"){
// }

require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const db_URL = process.env.ATLASDB_URL;

const express = require("express");
const app = express();

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
store.on("error" , ()=>{
  console.log("error in mongo session store",err);
})
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

app.listen(8080, () => {
  console.log("backend is working.");
});

// middleware to add flash messages in res.local
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/reviews", reviewRouter);
app.use("/user", userRouter);

// Handling requests to invalid pages
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!!"));
});

// middleware to handle all errors
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});
