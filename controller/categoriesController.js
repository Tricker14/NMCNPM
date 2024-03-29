const User = require("../models/user");
const Category = require("../models/category");
const {Item} = require("../models/item");
const jwt = require("jsonwebtoken");

module.exports.category_get_all = async function (req, res) {
  const categories = await Category.find();
  res.render("categories/categories", {
    error: null,
    categories: categories,
  });
};

module.exports.category_get = async function (req, res) {
  const id = req.params._id;
  let category = null;
  try {
    category = await Category.findById(id);
  } 
  catch (err) {
    res.status(400).json({err});
  }
  const items = await Item.find({ category });
  console.log('items ', items);
  const message =
  req.query.delete != undefined ? "Deleted item successfully" : null;

  let count = 0;
  items.forEach(function (item){
    if(item.isListing === true){
      count++;
    }
  });
  res.render('items/listing', {
    items: items,
    user: res.locals.user,
    message: message,
    count: count,
  });
};
