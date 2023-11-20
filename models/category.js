const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, "Please enter a category name"],
        unique: true
    },
    image: {
        type: String,
        require: [true, "Please choose an image"],
        unique: true
    }
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;