const Bid = require("../../models/bid");

module.exports.bid_post = async function(req, res){
    const { price, product, bidder } = req.body;
    try{
        const bid = await Bid.create(req.body);
        res.status(201).json({bid});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
}