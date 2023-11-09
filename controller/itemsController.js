const User = require("../models/user");
const Category = require("../models/category");
const Item = require("../models/item");
const jwt = require("jsonwebtoken");

module.exports.item_get = async function (req, res) {
  const id = req.params._id;
  try {
    const item = await Item.findById(id).populate("owner");
    res.render("items/item-details", {
      item: item,
    });
  } catch (e) {
    //can occur CastError: Cast to ObjectId failed for value "create" (type string) at path "_id" for model "item"
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
  const items = await Item.find({}).populate("owner");
  res.render("items/listing", {
    items: items,
    user: res.locals.user,
  });
};

module.exports.create_item = async function (req, res) {
  const { name, description, date, category, startingBid } = req.body;

  const images = req.files;
  let image = null;
  let previewImages = [];

  image = Object.values(images)[0][0].filename;

  Object.values(images)[1].forEach((preview) => {
    previewImages.push(preview.filename);
  });
  const highestBid = startingBid;
  const owner = res.locals.user;
  const winner = null;
  try {
    const item = await Item.create({
      name,
      description,
      date,
      category,
      startingBid,
      highestBid,
      image,
      previewImages,
      owner,
      winner,
    });
    res.redirect("/test/webid/items/" + item._id + "?create=succeed");
  } catch (err) {
    res.send("Catched error happened in item");
  }
};

module.exports.item_edit = async function (req, res) {
  const { name, description, date, category, startingBid } = req.body;
  const id = req.body._id;
  console.log(id);

  const item = await Item.findById(id);

  const images = req.files;
  let image = null;
  let previewImages = [];
  if (Object.values(images)[0] == undefined) {
    console.log("User didnt edit any images");
  } else {
    if (Object.values(images)[0][0].fieldname === "previewImages") {
      Object.values(images)[0].forEach((preview) => {
        previewImages.push(preview.filename);
        item.previewImages = previewImages;
      });
      item.save();
    } else if (
      Object.values(images)[0][0].fieldname === "image" &&
      !Object.values(images)[1]
    ) {
      item.image = Object.values(images)[0][0].filename;
      item.save();
    } else {
      console.log("User updated both");
      image = Object.values(images)[0][0].filename;
      Object.values(images)[1].forEach((preview) => {
        previewImages.push(preview.filename);
      });
      item.image = image;
      item.previewImages = previewImages;
      item.save();
    }
  }

  res.send("Maintaining");
};

module.exports.get_edit_page = async function (req, res) {
  const id = req.params.id;
  const item = await Item.findById(id);

  res.render("items/edit-item", { item: item, categories: [] });
};
