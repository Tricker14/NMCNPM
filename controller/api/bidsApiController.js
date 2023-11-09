const Bid = require("../../models/bid");

module.exports.bid_post = async function(req, res){
    const { price, product, bidder } = req.body;
    try{
        let currentPrice = product.
        if(price );
        const bid = await Bid.create({ price, product, bidder });
        res.status(201).json({bid});
    }
    catch(err){
        console.log("error", err);
        res.status(400).json({message: err});
    }
}