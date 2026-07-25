const mongoose = require("mongoose");
let data = require("./data");
const Listing = require("../models/Listing");
const Review = require("../models/reviews");
const User = require("../models/User");

require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const db_URL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(db_URL);
}
main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch(() => {
    console.log("connection unsuccesfull");
  });

async function initDB() {
  await Listing.deleteMany({});
  await Review.deleteMany({});
  await User.deleteMany({});

  const user = new User({
    username: "rastogi_23",
    email: "rastogi23@gmail.com",
  });
  const registeredUser = await User.register(user, "admin123");
  console.log("User created:", registeredUser._id);

  data = data.map((obj) => ({ ...obj, owner: registeredUser._id }));
  await Listing.insertMany(data);
  console.log("DB was initialised");
}
initDB();
