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

  await rev1.populate("author", "username");

  res.status(201).json({
    status: "success",
    message: "Review Added Successfully",
    review: rev1,
  });
};

module.exports.delete = async (req, res) => {
  let { id, id2 } = req.params;

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: id2 },
  });
  await Review.findByIdAndDelete(id2);

  res.status(200).json({
    status: "success",
    message: "Review Deleted Successfully",
  });
};
