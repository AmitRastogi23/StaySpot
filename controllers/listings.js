const Listing = require("../models/Listing");

module.exports.index = async (req, res) => {
  let result = await Listing.find({});
  res.render("listings/index.ejs", { result });
};

module.exports.new = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.create = async (req, res, next) => {
  const list = new Listing({
    title: req.body.title,
    description: req.body.description,
    image: req.file.path,
    price: req.body.price,
    location: req.body.location,
    country: req.body.country,
    owner: req.user._id,
  });
  await list.save();
  req.flash("success", "new listings added successfully");
  res.redirect("/listings");
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  let result = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!result) {
    req.flash("failure", "Listing doesn't exists.");
    res.redirect("/listings");
  } else {
    let review = result.reviews;
    res.render("listings/show.ejs", { result, review });
  }
};

module.exports.edit = async (req, res) => {
  let { id } = req.params;
  let result = await Listing.findById(id);
  if (!result) {
    req.flash("failure", "Listing doesn't exists");
    res.redirect("/listings");
  } else {
    res.render("listings/edit.ejs", { result });
  }
};

module.exports.update = async (req, res) => {
  let { id } = req.params;
  let data = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    country: req.body.country,
  };
  if(typeof req.file !== "undefined"){
    data.image = req.file.path;
  }
  await Listing.findByIdAndUpdate(id, data);
  req.flash("success", "Listing Updated Successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully");
  res.redirect("/listings");
};
