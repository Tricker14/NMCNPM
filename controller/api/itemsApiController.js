const User = require("../models/user");
const Category = require("../models/category");
const Item = require("../models/item");
const jwt = require("jsonwebtoken");

module.exports.item_post = async function (req, res) {
  const { name, description, date, category, startingBid } = req.body;

  const highestBid = startingBid;
  const image = req.file.path;
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
      owner,
      winner,
    });
    res.status(201).json({ item, redirect: "/item/listing" });
  } catch (err) {
    const errors = handleItemErrors(err);
    res.status(400).json({ errors });
  }
};
