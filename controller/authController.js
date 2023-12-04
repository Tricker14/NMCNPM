const User = require("../models/user");
const Category = require("../models/category");
const Bid = require("../models/bid");
const { Item, calculateTimeLeft } = require("../models/item");
const jwt = require("jsonwebtoken");

// controller actions
module.exports.signup = (req, res) => {
  res.render("users/signup", {
    userSchema: User.schema,
  });
};

module.exports.login = (req, res) => {
  res.render("users/login");
};

module.exports.logout = function (req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/webid/home");
};

module.exports.profile = async (req, res) => {
  const id = req.params._id;
  try{
    const user = await User.findById(id);
    const duplicateBids = await Bid.find({ bidder: user }).populate('product');
    let bids = null;

    if(duplicateBids){
      bids = new Set();
      const bidsId = new Set();
      duplicateBids.forEach(function(bid){
        if(!bidsId.has(bid.product._id)){
          bids.add(bid);
          bidsId.add(bid.product._id);
          calculateTimeLeft(bid.product);
        }
        else{
          bids.forEach(function(oldBid){
            if(oldBid.product._id === bid.product._id && oldBid.price < bid.price){
              bids.delete(oldBid);
              bids.add(bid);
            }
          })
        }
      });
    }

    res.render("users/profile", {
      user: user,
      userSchema: User.schema,
      bids: bids
    });
  }
  catch(err){
    console.log(err);
    res.status(400).json({ err });
  }
};

module.exports.history = async function(req, res){
  const id = req.params._id;
  try{
    const user = await User.findById(id);
    const duplicateBids = await Bid.find({ bidder: user }).populate('product');
    let bids = null;

    if(duplicateBids){
      bids = new Set();
      const bidsId = new Set();
      duplicateBids.forEach(function(bid){
        if(!bidsId.has(bid.product._id)){
          bids.add(bid);
          bidsId.add(bid.product._id);
          calculateTimeLeft(bid.product);
        }
        else{
          bids.forEach(function(oldBid){
            if(oldBid.product._id === bid.product._id && oldBid.price < bid.price){
              bids.delete(oldBid);
              bids.add(bid);
            }
          })
        }
      });
    }

    res.render('users/history', {
      bids: bids
    })
  }
  catch(err){
    console.log(err);
    res.status(400).json({ err });
  }
}