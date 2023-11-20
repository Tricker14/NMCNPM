const User = require("../models/user");
const Category = require("../models/category");
const Item = require("../models/item");
const jwt = require("jsonwebtoken");

// controller actions
module.exports.signup = (req, res) => {
  res.render("users/signup", {
    userSchema: User.schema,
  });
};

module.exports.login = (req, res) => {
  res.render("users/login");
};

module.exports.logout = function (req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/webid/home");
};

module.exports.profile = async (req, res) => {
  const id = req.params._id;
  try{
    const user = await User.findById(id);
    console.log(user.username);
    console.log(id);
    res.render("users/profile", {
      user: user,
      userSchema: User.schema,
    });
  }
  catch(err){
    console.log(err);
    res.status(400).json({ err });
  }
};