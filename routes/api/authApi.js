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

router.post("/signup", authApiController.signup);
router.post("/login", authApiController.login);
router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));
router.get("/auth/google/callback", passport.authenticate("google"), authApiController.googleAuth);

module.exports = router;
