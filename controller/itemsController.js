const User = require("../models/user");
const Category = require("../models/category");
const Item = require("../models/item");
const Bid= require("../models/bid");
const jwt = require("jsonwebtoken");

module.exports.item_get = async function (req, res) {
  const id = req.params._id;
  try {
    const item = await Item.findById(id).populate("owner");
    const highestBid = await Bid.find({product: item}).sort({price: -1}).limit(1).populate('bidder');
    let highestBidder = null
    if(highestBid[0]){
      highestBidder = highestBid[0].bidder;
    }
    console.log("highestBid ", highestBid);
    console.log("highestBidder ", highestBidder);
    
    const bid = await Bid.find({product: item, bidder: res.locals.user}).sort({price: -1}).limit(1).populate('bidder');
    let bidder = null;
    let price = 0;
    if(bid[0]){
      bidder = bid[0].bidder;
      price = bid[0].price;
    }
    console.log("bid ", bid);
    console.log("bidder ", bidder);

    res.render("items/item-details", {    
      item: item,
      highestBidder: highestBidder,
      bidder: bidder,
      price: price
    });
  } catch (e) {
    //can occur CastError: Cast to ObjectId failed for value "create" (type string) at path "_id" for model "item"
    console.log("error ", e);
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
