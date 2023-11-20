const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Item = require("../models/item");

// Configure multer storage and file name
const storageItem = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/items-images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.replace(/ /g, ""));
  },
});

const storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users-images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.replace(/ /g, ""));
  },
});

// Create multer upload instance
const upload = multer({ storage: storageItem });

const uploadUser = multer({ storage: storageUser });

module.exports = { upload, uploadUser };
