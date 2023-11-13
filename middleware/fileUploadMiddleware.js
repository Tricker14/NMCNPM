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
    cb(null, Date.now() + file.originalname.replace(/ /g, ""));
  },
});

// Create multer upload instance
const upload = multer({ storage: storage });

module.exports = { upload };
