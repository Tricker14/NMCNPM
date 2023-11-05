const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const {
  requireAuth,
  checkUser,
  upload,
} = require("../middleware/authMiddleware");

// user
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.delete("/user/:_id", authController.delete_user);

module.exports = router;
