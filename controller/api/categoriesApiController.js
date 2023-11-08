const User = require("../../models/user");
const Category = require("../../models/category");
const Item = require("../../models/item");
const jwt = require("jsonwebtoken");

module.exports.category_post = async function (req, res) {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json({ category, redirect: "/categories/categories" });
    return;
  } catch (err) {
    const errors = handleItemErrors(err);
    res.status(400).json({ errors });
  }
};
