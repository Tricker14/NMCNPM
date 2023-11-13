const mongoose = require('mongoose');
const User = require("./user");
const Item = require("./item");

const bidSchema = new mongoose.Schema({
    price:{
        type: Number,
        require: [true, "Please enter a price"],
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
    },
    bidder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});

const Bid = mongoose.model('bid', bidSchema);

module.exports = Bid;