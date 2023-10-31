const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, "Please enter a category name"],
        unique: true
    }
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;