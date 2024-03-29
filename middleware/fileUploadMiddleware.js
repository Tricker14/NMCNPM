const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Item = require("../models/item");

function checkExist(dir){
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Configure multer storage and file name
const storageItem = multer.diskStorage({});

const storageUser = multer.diskStorage({});

const storageCategory = multer.diskStorage({});

// Create multer upload instance
const upload = multer({ storage: storageItem });

const uploadUser = multer({ storage: storageUser });

const uploadCategory = multer({ storage: storageCategory });

module.exports = { upload, uploadUser, uploadCategory };
