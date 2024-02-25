const User = require("../models/user");
const Category = require("../models/category");
const { Item } = require("../models/item");
const Bid = require("../models/bid");
const jwt = require("jsonwebtoken");
const { unlinkSync } = require("node:fs");
const { countdownDeleteItem, calculateTimeLeft } = require("../models/item");
const fs = require('fs');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion
});

function isFavorite(user, item){
  if(user != null){
    if(user.favorites.length == 0){
      return false;
    }
    else{
      let count = 0;
      user.favorites.forEach(favorite=>{
        if(favorite.equals(item._id)){
          count = 1;
        }
      })
      if(count === 0){
        return false
      }
      else{
        return true;
      }
    }
  }else{
    return false;
  }
  
}

module.exports.item_get = async function (req, res) {
  const id = req.params._id;
  const create =
    req.query.create !== undefined ? "Created item successfully" : null;
  const update =
    req.query.update !== undefined ? "Updated item successfully" : null;
  const bidFail = 
    req.query.bid !== undefined ? "Your bid must higher than the starting bid" : null;
  try {
    const item = await Item.findById(id).populate("owner").populate("category");
    
    const highestBid = await Bid.find({ product: item })
      .sort({ price: -1 })
      .limit(1)
      .populate("bidder");
    let highestBidder = null;
    if(highestBid[0]){
      highestBidder = highestBid[0].bidder;
    }

    const bid = await Bid.find({ product: item, bidder: res.locals.user })
      .sort({ price: -1 })
      .limit(1)
      .populate("bidder");
    let bidder = null;
    let price = 0;
    if (bid[0]) {
      bidder = bid[0].bidder;
      price = bid[0].price;
    }
    calculateTimeLeft(item);

    theItem = item.toObject();

    theItem.isFavorite = isFavorite(res.locals.user, item)
    console.log(theItem.isFavorite)

    if (res.locals.user != null && res.locals.user.username === theItem.owner.username) {
      theItem.isOwned = true;
    } else {
      theItem.isOwned = false;
    }

    console.log(typeof theItem);
    res.render("items/item-details", {
      item: theItem,
      highestBidder: highestBidder,
      bidder: bidder,
      price: price,
      createMessage: create,
      updateMessage: update,
      bidMessage: bidFail,
    });
  } catch (e) {
    //can occur CastError: Cast to ObjectId failed for value "create" (type string) at path "_id" for model "item"
    console.log("error ", e);
    res.send("Something went wrong");
    return;
  }
};

module.exports.item_create_page = async function (req, res) {
  const categories = await Category.find();
  res.render("items/create", {
    categories: categories,
  });
};

module.exports.listing_get = async function (req, res) {

  const theItems = []
  const items = await Item.find({ isListing: true }).populate("owner");
  await items.forEach(async function (item) {
    tempItem = item.toObject();
    if (res.locals.user != null && res.locals.user.username === item.owner.username) {
      tempItem.isOwned = true;
    } else {
      tempItem.isOwned = false;
      tempItem.isFavorite = isFavorite(res.locals.user, item)
    }
    theItems.push(tempItem)
  });
  const message =
    req.query.delete != undefined ? "Deleted item successfully" : null;

  let count = 0;
  items.forEach(function (item){
    if(item.isListing === true){
      count++;
    }
  });
  res.render("items/listing", {
    items: theItems,
    user: res.locals.user,
    message: message,
    count: count,
  });
};

module.exports.get_edit_page = async function (req, res) {
  const id = req.params._id;
  const item = await Item.findById(id);
  const categories = await Category.find();

  res.render("items/edit-item", { item: item, categories: categories });
};

module.exports.create_item = async function (req, res) {
  console.log("body ", req.body);

  let day = req.body.day;
  let hour = req.body.hour;
  let minute = req.body.minute;
  let second = req.body.second;
  const countdown = { day, hour, minute, second };

  const { name, description, date, startingBid, bidIncrement } = req.body;

  const images = req.files;
  let image = null;
  let previewImages = [];

  image = Object.values(images)[0][0].filename;

  Object.values(images)[1].forEach((preview) => {
    previewImages.push(preview.filename);
  });
  const highestBid = startingBid;
  const owner = res.locals.user;

  const categoryString = req.body.category;
  const category = await Category.findOne({ name: categoryString });

  console.log("files ", req.files);

  if(image){  // only upload image to cloud only image is not null
    // store image into cloud     
    console.log("start image");
    let fileBuffer = fs.readFileSync(Object.values(images)[0][0].path);
    console.log("buffer 1", fileBuffer);
    const params = {
      Bucket: bucketName,
      Key: Object.values(images)[0][0].filename,
      Body: fileBuffer,
      ContentType: Object.values(images)[0][0].mimetype,
    }

    console.log("execute successfully 1");
    const command = new PutObjectCommand(params);
    await s3.send(command);
    console.log("done image");
    // store image to cloud
  }

  if(previewImages.length > 0){  // only upload image to cloud only image is not null
    // store image into cloud     
    console.log("start preview");
    Object.values(images)[1].forEach(async function(preview){
      let fileBuffer = fs.readFileSync(preview.path);
      console.log("buffer 2", fileBuffer);
      const params = {
        Bucket: bucketName,
        Key: preview.filename,
        Body: fileBuffer,
        ContentType: preview.mimetype,
      }
  
      console.log("execute successfully 2");
      const command = new PutObjectCommand(params);
      await s3.send(command);
    })
    console.log("done preview");
    // store image to cloud
  }

  try {
    const item = await Item.create({
      name,
      description,
      date,
      category,
      startingBid,
      bidIncrement,
      highestBid,
      image,
      previewImages,
      owner,
      countdown,
    });
    countdownDeleteItem(item);

    res.redirect("/webid/items/" + item._id + "?create=succeed");
  } catch (err) {
    console.log(err);
    res.send("Catched error happened in item");
  }
};

async function deleteMainImage(image) {
  console.log(image);

  try {
    // unlinkSync(`public/images/items-images/${image}`);

    // delete image from cloud
    const params = {
      Bucket: bucketName,
      Key: image
    }
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    // delete image from cloud

  } catch (err) {
    console.log("cannot delete image");
    console.log(err);
  }
}

function deletePreviewImages(images) {
  images.forEach(async (image) => {
    try {
      // unlinkSync(`public/images/items-images/${image}`);

      // delete image from cloud
      const params = {
        Bucket: bucketName,
        Key: image
      }
      const command = new DeleteObjectCommand(params);
      await s3.send(command);
      // delete image from cloud

    } catch (err) {
      console.log("cannot delete image");
      console.log(err);
    }
  });
}

module.exports.item_edit = async function (req, res) {
  console.log('body ', req.body);
  const { description, bidIncrement } = req.body;

  const id = req.body._id;
  const item = await Item.findById(id);

  item.description = description;
  item.bidIncrement = bidIncrement;
  const categoryString = req.body.category;
  const category = await Category.findOne({name: categoryString});
  item.category = category;

  const images = req.files;
  let image = null;
  let previewImages = [];
  if (Object.values(images)[0] == undefined) {
    console.log("User didnt edit any images");
    item.save();
  } else {
    if (Object.values(images)[0][0].fieldname === "previewImages") {  // change preview images
      deletePreviewImages(item.previewImages);
      Object.values(images)[0].forEach((preview) => {
        previewImages.push(preview.filename);
        item.previewImages = previewImages;
      });
      item.save();

      // store image into cloud     
      Object.values(images)[0].forEach(async function(preview){
        let fileBuffer = fs.readFileSync(preview.path);
        console.log("buffer 2", fileBuffer);
        const params = {
          Bucket: bucketName,
          Key: preview.filename,
          Body: fileBuffer,
          ContentType: preview.mimetype,
        }
    
        console.log("execute successfully 2");
        const command = new PutObjectCommand(params);
        await s3.send(command);
      })
      // store image to cloud

    } else if (
      Object.values(images)[0][0].fieldname === "image" &&    // change main image
      !Object.values(images)[1]
    ) {
      console.log("Remove main");
      deleteMainImage(item.image);
      item.image = Object.values(images)[0][0].filename;
      item.save();

      // store image into cloud     
      console.log(Object.values(images)[0][0].path);
      let fileBuffer = fs.readFileSync(Object.values(images)[0][0].path);
      console.log("buffer 1", fileBuffer);
      const params = {
        Bucket: bucketName,
        Key: Object.values(images)[0][0].filename,
        Body: fileBuffer,
        ContentType: Object.values(images)[0][0].mimetype,
      }

      console.log("execute successfully 1");
      const command = new PutObjectCommand(params);
      await s3.send(command);
      // store image to cloud

    } else {      // change both main and preview images
      deleteMainImage(item.image);
      deletePreviewImages(item.previewImages);
      image = Object.values(images)[0][0].filename;
      Object.values(images)[1].forEach((preview) => {
        previewImages.push(preview.filename);
      });
      item.image = image;
      item.previewImages = previewImages;
      item.save();

      // store image into cloud     
      console.log(Object.values(images)[0][0].path);
      let fileBufferMain = fs.readFileSync(Object.values(images)[0][0].path);
      const paramsMain = {
        Bucket: bucketName,
        Key: Object.values(images)[0][0].filename,
        Body: fileBufferMain,
        ContentType: Object.values(images)[0][0].mimetype,
      }

      const commandMain = new PutObjectCommand(paramsMain);
      await s3.send(commandMain);
      // store image to cloud

      // store image into cloud     
      Object.values(images)[1].forEach(async function(preview){
        let fileBufferPreview = fs.readFileSync(preview.path);
        const paramsPreview = {
          Bucket: bucketName,
          Key: preview.filename,
          Body: fileBufferPreview,
          ContentType: preview.mimetype,
        }

        const commandPreview = new PutObjectCommand(paramsPreview);
        await s3.send(commandPreview);
      })
      // store image to cloud

    }
  }

  res.redirect("/webid/items/" + item.id + "?update=succeed");
};

module.exports.delete_item = async function (req, res) {
  const id = req.params._id;
  await Item.findByIdAndDelete(id);
  res.redirect("/webid/items?delete=succeed");
};
