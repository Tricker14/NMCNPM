const User = require("../models/user");
const Category = require("../models/category");
const Item = require("../models/item");
const jwt = require("jsonwebtoken");

module.exports.category_get_all = async function (req, res) {
  const categories = await Category.find();
  res.render("categories/categories", {
    categories: categories,
  });
};

module.exports.category_get = async function (req, res) {
  const id = req.params._id;
  let category = null;
  try {
    category = await Category.findById({ id });
  } catch (e) {
    res.send("Something went wrong");
    return;
  }
  const items = await Item.find({ category });
  res.redirect("/items/listing", {
    items: items,
  });
};
