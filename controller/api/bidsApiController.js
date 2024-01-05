const Bid = require("../../models/bid");
const { Item } = require("../../models/item");
const User = require("../../models/user");

module.exports.bid_post = async function(req, res){
    const product = await Item.findById(req.params._id);
    const bidder = res.locals.user;
    const bidIncrement = req.body.bidIncrement;

    const price = product.highestBid + bidIncrement * product.bidIncrement;
    console.log("bidIncrement", bidIncrement);
    try{
        if(price > product.highestBid){
            const bid = await Bid.create({ bidIncrement, price, product, bidder });
            product.highestBid = price;
            await product.save();
            // res.status(201).json({bid});
            res.redirect(`/webid/items/${product._id}`);
        }
        else{
            res.status(400).json(`You must bid higher than ${product.highestBid}`);
        }
    }
    catch(err){
        console.log("error", err);
        res.status(400).json({message: err});
    }
}

module.exports.bid_delete = async function(req, res){
    try{
        const id = req.params._id;
        const deleteBid = await Bid.findById(id).populate('product');
        console.log('delete', deleteBid);

        const item = deleteBid.product;
        const bid = await Bid.find({product: item._id})
            .sort({ price: -1 })
            .skip(1)
            .limit(1);
        if(bid.length > 0){
            console.log('ok', bid);
            item.highestBid = bid[0].price;
        }
        else{
            console.log('no');
            item.highestBid = item.startingBid;
        }
        await item.save();
        
        if (!deleteBid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        await deleteBid.remove();

        res.redirect('/webid/items/1');
    }
    catch(err){
        console.log("error", err);
        res.status(400).json({message: err});
    }
}