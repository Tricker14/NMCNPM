const User = require("../models/user");
const Category = require("../models/category");
const Item = require("../models/item");
const jwt = require("jsonwebtoken");

// controller actions
module.exports.signup = (req, res) => {
  res.render("user/signup", {
    userSchema: User.schema,
  });
};

module.exports.login = (req, res) => {
  res.render("user/login");
};

module.exports.logout = function (req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
