const mongoose = require("mongoose");
const User = require("./user");
const Category = require("./category");
const { unlinkSync } = require("node:fs");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an item name"],
  },
  description: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  startingBid: {
    type: Number,
    required: [true, "Please enter an item bid price"],
  },
  highestBid: {
    type: Number,
  },
  image: {
    type: String,
    required: [true, "Please choose an image"],
  },
  previewImages: [
    {
      type: String,
      required: [true, "Please choose an image"],
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

function deleteMainImage(image) {
  console.log(image);

  try {
    unlinkSync(`public/images/items-images/${image}`);
  } catch (err) {
    console.log("cannot delete image");
    console.log(err);
  }
}

function deletePreviewImages(images) {
  images.forEach((image) => {
    try {
      unlinkSync(`public/images/items-images/${image}`);
    } catch (err) {
      console.log("cannot delete image");
      console.log(err);
    }
  });
}

// clean up image when delete an item
itemSchema.post("findOneAndDelete", async function (doc) {
  deleteMainImage(doc.image);
  deletePreviewImages(doc.previewImages);
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;
