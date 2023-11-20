const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const {
  requireAuth,
  checkUser,
  upload,
} = require("../middleware/authMiddleware");

// user
router.get("/signup", authController.signup);
router.get("/login", authController.login);
router.get("/logout", authController.logout);
router.get('/profile/:_id', requireAuth, authController.profile);

module.exports = router;
