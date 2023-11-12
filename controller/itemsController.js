const User = require("../models/user");
const Category = require("../models/category");
const Item = require("../models/item");
const Bid= require("../models/bid");
const jwt = require("jsonwebtoken");

module.exports.item_get = async function (req, res) {
  const id = req.params._id;
  try {
    const item = await Item.findById(id).populate("owner");
    console.log("owner", item.owner);
    const highestBid = await Bid.find({product: item}).sort({price: -1}).limit(1).populate('bidder');
    const highestBidder = highestBid[0].bidder;
    
    const userBid = await Bid.find({product: item, bidder: res.locals.user}).sort({price: -1}).limit(1).populate('bidder');
    const currentUser = userBid[0].bidder;
    res.render("items/item-details", {    
      item: item,
      highestBidder: highestBidder,
      userBid: userBid,
      currentUser: currentUser
    });
  } catch (e) {
    //can occur CastError: Cast to ObjectId failed for value "create" (type string) at path "_id" for model "item"
    res.send("Something went wrong");
    return;
  }
};

module.exports.item_create_page = async function (req, res) {
  const categories = await Category.find();
  res.render("items/create", {
    categories: categories,
  });
};

module.exports.listing_get = async function (req, res) {
  const items = await Item.find();
  res.render("items/listing", {
    items: items,
  });
};
