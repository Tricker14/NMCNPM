const mongoose = require('mongoose');
const User = require("./user");

const bidSchema = new mongoose.Schema({
    bidIncrement:{
        type: Number,
        require: [true, "Please enter a bid increment"],
    },
    price:{
        type: Number,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
    },
    bidder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

// bidSchema.pre("remove", async function(next){
//     console.log('access pre');
//     const itemID = await this.product;
//     let item = null;
//     if(itemID){
//         console.log('yeah', itemID);
//         item = await Item.findById(itemID);
//         console.log("this is it", item);
//     }
//     else{
//         console.log('fuck')
//     }
    
//     if(item){
//         console.log('item', item);
//         item.highestBid = item.startingBid;
//         await item.save();
//     }
//     next();
// }); 

// bidSchema.pre("remove", async function(next){
//     console.log('access pre');
//     const itemID = this.product;

//     // Access the Item model by name
//     const Item = mongoose.model('item');
//     const item = await Item.findById(itemID);
    
//     if(item){
//         console.log('item', item);
//         item.highestBid = item.startingBid;
//         await item.save();
//     }
//     next();
// }); 

const Bid = mongoose.model('bid', bidSchema);

module.exports = Bid;