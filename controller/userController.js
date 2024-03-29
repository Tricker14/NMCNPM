const User = require("../models/user");
const Bid = require("../models/bid");
const { Item, calculateTimeLeft } = require("../models/item");

module.exports.profile = async (req, res) => {
    const id = req.params._id;
    try{
      const user = await User.findById(id).populate("favorites");
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
  
      // Convert Set to an array
      bids = Array.from(bids);

      res.render("users/profile", {
        user: user,
        userSchema: User.schema,
        bids: bids,
        products: user.favorites
      });
    }
    catch(err){
      console.log(err);
      res.status(400).json({ err });
    }
  };