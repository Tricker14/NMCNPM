const User = require("../models/user");
const Category = require("../models/category");
const Bid = require("../models/bid");
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