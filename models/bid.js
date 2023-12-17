const mongoose = require('mongoose');
const User = require("./user");
const { Item } = require("./item");

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

const Bid = mongoose.model('bid', bidSchema);

module.exports = Bid;