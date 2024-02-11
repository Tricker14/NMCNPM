const express = require("express");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authApiController = require("../../controller/api/authApiController");
const {
  requireAuth,
  checkUser,
  upload,
} = require("../../middleware/authMiddleware");
const { uploadUser } = require("../../middleware/fileUploadMiddleware");
const passport = require("passport");

const maxAge = 3 * 24 * 60 * 60;
const createToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: maxAge,
  });
};

router.post("/signup", authApiController.signup);
router.post("/login", authApiController.login);
router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));
router.get("/auth/google/callback", passport.authenticate("google"), function(req, res){
  const user = req.user;
  const token = createToken(user._id);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.redirect("/webid/home");
});

module.exports = router;
