const mongoose = require("mongoose");
const User = require("./user");
const Category = require("./category");

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
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  image: {
    type: String,
  },
  previewImages: [
    {
      type: String,
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

const Item = mongoose.model("item", itemSchema);

module.exports = Item;
