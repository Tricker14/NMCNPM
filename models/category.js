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

function deleteImage(image) {
    console.log(image);
  
    try {
      unlinkSync(`public/images/categories-images/${image}`);
    } catch (err) {
      console.log("cannot delete image");
      console.log(err);
    }
}

categorySchema.pre("findOneAndDelete", async function (next) {
    const doc = await this.findOne();
    if (doc) {
      deleteImage(doc.image);
    }
    next();
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;