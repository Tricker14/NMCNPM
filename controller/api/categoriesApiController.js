const Category = require("../../models/category");
const jwt = require("jsonwebtoken");

module.exports.category_post = async function (req, res) {
  console.log("body, ", req.body);
  console.log("file ", req.file);
  const { name } = req.body;
  const image  = req.file.filename;
  try {
    await Category.create({ name, image });
    res.redirect('/webid/categories');
  } catch (err) {
    res.status(400).json({ err });
  }
};
