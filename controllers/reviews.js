const Review = require("../models/reviews");
const Listing = require("../models/Listing");

module.exports.add = async (req, res) => {
  let { id } = req.params;
  let rev1 = new Review({
    comment: req.body.comment,
    rating: req.body.rating,
    author: req.user._id,
  });
  await rev1.save();

  let list = await Listing.findById(id);
  list.reviews.push(rev1);
  await list.save();
  req.flash("success", "Review Added Successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
  let { id, id2 } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: id2 } });
  await Review.findByIdAndDelete(id2);
  req.flash("success", "Review Deleted Successfully");
  res.redirect(`/listings/${id}`);
};
