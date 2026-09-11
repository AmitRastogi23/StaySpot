const Listing = require("../models/Listing");
const { cloudinary } = require("../cloudConfig");

module.exports.index = async (req, res) => {
  let result = await Listing.find({});
  res.status(200).json({
    status: "success",
    data: result,
  });
};

module.exports.create = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(
    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    {
      folder: "wanderlust_dev",
    },
  );
  const list = new Listing({
    title: req.body.title,
    description: req.body.description,
    image: result.secure_url,
    price: req.body.price,
    location: req.body.location,
    country: req.body.country,
    owner: req.user._id,
  });
  await list.save();
  res.status(201).json({
    status: "success",
    message: "New listing added successfully",
    listing: list,
  });
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
    return res.status(404).json({
      status: "failure",
      message: "Listing doesn't exist.",
    });
  }
  res.status(200).json({
    status: "success",
    listing: result,
  });
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
  if (req.file) {
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "wanderlust_dev",
      },
    );
    data.image = result.secure_url;
  }

  const updatedListing = await Listing.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "Listing Updated Successfully",
    listing: updatedListing,
  });
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "Listing Deleted Successfully",
  });
};
