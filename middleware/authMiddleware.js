const jwt = require("jsonwebtoken");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");

const requireAuth = function (req, res, next) {
  const token = req.cookies.jwt;

  // check if jwt exists & verified
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN,
      function (err, decodedToken) {
        if (err) {
          console.log(err.message);
          res.redirect("/webid/login");
        } else {
          console.log(decodedToken);
          next();
        }
      }
    );
  } else {
    res.redirect("/webid/login");
  }
};

const checkUser = function (req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN,
      async function (err, decodedToken) {
        if (err) {
          console.log("check 1");
          console.log(err.message);
          res.locals.user = null;
          res.locals.currentUser = null;
          next();
        } else {
          console.log("check 2");
          console.log("decode ", decodedToken);
          let user = await User.findById(decodedToken.id);
          console.log("user ", user);
          res.locals.user = user;
          res.locals.currentUser = user;
          next();
        }
      }
    );
  } else {
    console.log("check 3");
    res.locals.user = null;
    res.locals.currentUser = null;
    next();
  }
};

const checkAdmin = function (req, res, next) {
  const token = req.cookies.jwt;

  // check if jwt exists & verified
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN,
      async function (err, decodedToken) {
        if (err) {
          console.log(err.message);
          res.redirect("/webid/login");
        } else {
          let user = await User.findById(decodedToken.id);
          if(user.role === "user"){
            res.redirect("/webid/login");
          }
          next();
        }
      }
    );
  } else {
    res.redirect("/webid/login");
  }
};

module.exports = { requireAuth, checkUser, checkAdmin };
