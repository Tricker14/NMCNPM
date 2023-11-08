const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Item = require("../models/item");

// Configure multer storage and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/items-images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create multer upload instance
const upload = multer({ storage: storage });

const deleteImage = function(item){
  try {
    fs.unlinkSync(`public/images/items-images/${item.image}`);
    item.previewImages.forEach(previewImage => {
      fs.unlinkSync(`public/images/items-images/${previewImage}`);
    });
    console.log("Delete File successfully.");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { upload, deleteImage };
