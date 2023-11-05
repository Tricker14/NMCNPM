const User = require("../models/user");
const Category = require("../models/category");
const Item = require("../models/item");
const jwt = require("jsonwebtoken");

module.exports.item_get = async function (req, res) {
  const id = req.params._id;
  const item = await Item.findById(id).populate("owner");
  res.render("item/item", {
    item: item,
  });
};

module.exports.item_create_page = async function (req, res) {
  const categories = await Category.find();
  res.render("item/create", {
    categories: categories,
  });
};

module.exports.listing_get = async function (req, res) {
  const items = await Item.find();
  res.render("item/listing", {
    items: items,
  });
};
