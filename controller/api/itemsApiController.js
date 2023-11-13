const User = require("../../models/user");
const Category = require("../../models/category");
const Item = require("../../models/item");
const jwt = require("jsonwebtoken");

module.exports.item_post = async function (req, res) {
  const { name, description, date, category, startingBid } = req.body;

  const images = req.files;
  let image = null;
  let previewImages = [];

  image = Object.values(images)[0][0].filename;

  Object.values(images)[1].forEach((preview) => {
    console.log(preview);
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
    res.status(201).json({ item, redirect: "/items" });
  } catch (err) {
    const errors = handleItemErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.delete_item = async function(req, res){
  const id = req.params._id;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ message: `cannot find item with id ${id}` });
    }
    await item.remove();
    res.status(200).json({ item });
  } catch (err) {
    console.log(err);
  }
}
