const User = require("../models/user");
const Category = require("../models/category");
const { Item } = require("../models/item");
const Bid= require("../models/bid");
const jwt = require("jsonwebtoken");
const fs = require("node:fs");
const { unlinkSync } = require("node:fs");
const { countdownDeleteItem, calculateTimeLeft } = require("../models/item");

module.exports.item_get = async function (req, res) {
  const id = req.params._id;
  const create =
    req.query.create !== undefined ? "Created item successfully" : null;
  const update =
    req.query.update !== undefined ? "Updated item successfully" : null;
  try {
    const item = await Item.findById(id).populate("owner");
    const highestBid = await Bid.find({product: item}).sort({price: -1}).limit(1).populate('bidder');
    let highestBidder = null
    if(highestBid[0]){
      highestBidder = highestBid[0].bidder;
    }
    
    const bid = await Bid.find({product: item, bidder: res.locals.user}).sort({price: -1}).limit(1).populate('bidder');
    let bidder = null;
    let price = 0;
    if(bid[0]){
      bidder = bid[0].bidder;
      price = bid[0].price;
    }

    const countdown = calculateTimeLeft(item);
    console.log("countdown",countdown);

    res.render("items/item-details", {    
      item: item,
      highestBidder: highestBidder,
      bidder: bidder,
      price: price,
      createMessage: create,
      updateMessage: update,
      countdown
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
  const items = await Item.find({ isListing: true }).populate("owner");
  const message =
    req.query.delete != undefined ? "Deleted item successfully" : null;
  res.render("items/listing", {
    items: items,
    user: res.locals.user,
    message: message,
  });
};

module.exports.get_edit_page = async function (req, res) {
  const id = req.params._id;
  const item = await Item.findById(id);

  res.render("items/edit-item", { item: item, categories: [] });
};

module.exports.create_item = async function (req, res) {
  let day = req.body.day;
  let hour = req.body.hour;
  let minute = req.body.minute;
  let second = req.body.second;
  const countdown = { day, hour, minute, second };

  const { name, description, date, category, startingBid, bidIncrement } = req.body;

  const images = req.files;
  let image = null;
  let previewImages = [];

  image = Object.values(images)[0][0].filename;

  Object.values(images)[1].forEach((preview) => {
    previewImages.push(preview.filename);
  });
  const highestBid = startingBid;
  const owner = res.locals.user;
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
      countdown
    });
    countdownDeleteItem(item);

    res.redirect("/webid/items/" + item._id + "?create=succeed");
  } catch (err) {
    console.log(err);
    res.send("Catched error happened in item");
  }
};

function deleteMainImage(image) {
  console.log(image);

  try {
    unlinkSync(`public/images/items-images/${image}`);
  } catch (err) {
    console.log("cannot delete image");
    console.log(err);
  }
}

function deletePreviewImages(images) {
  images.forEach((image) => {
    try {
      unlinkSync(`public/images/items-images/${image}`);
    } catch (err) {
      console.log("cannot delete image");
      console.log(err);
    }
  });
}

module.exports.item_edit = async function (req, res) {
  const { name, description, date, category, startingBid } = req.body;
  const id = req.body._id;

  const item = await Item.findById(id);
  item.description = req.body.description;

  const images = req.files;
  let image = null;
  let previewImages = [];
  if (Object.values(images)[0] == undefined) {
    console.log("User didnt edit any images");
  } else {
    if (Object.values(images)[0][0].fieldname === "previewImages") {
      deletePreviewImages(item.previewImages);
      Object.values(images)[0].forEach((preview) => {
        previewImages.push(preview.filename);
        item.previewImages = previewImages;
      });
      item.save();
    } else if (
      Object.values(images)[0][0].fieldname === "image" &&
      !Object.values(images)[1]
    ) {
      console.log("Remove main");
      deleteMainImage(item.image);
      item.image = Object.values(images)[0][0].filename;
      item.save();
    } else {
      deleteMainImage(item.image);
      deletePreviewImages(item.previewImages);
      image = Object.values(images)[0][0].filename;
      Object.values(images)[1].forEach((preview) => {
        previewImages.push(preview.filename);
      });
      item.image = image;
      item.previewImages = previewImages;
      item.save();
    }
  }

  res.redirect("/webid/items/" + item.id + "?update=succeed");
};

module.exports.delete_item = async function (req, res) {
  const id = req.params._id;
  await Item.findByIdAndDelete(id);
  res.redirect("/webid/items?delete=succeed");
};
