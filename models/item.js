const mongoose = require('mongoose');
const User = require('./user');
const Category = require('./category');

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, "Please enter an item name"],
    },
    description:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    startingBid:{
        type: Number,
        require: [true, "Please enter an item bid price"],
    },
    highestBid:{
        type: Number,
    },
    image:{
        type: String,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    winner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;