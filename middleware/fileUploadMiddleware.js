const multer = require("multer");
const fs = require("fs");
const path = require("path");

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

module.exports = { upload };
