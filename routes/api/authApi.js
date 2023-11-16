const express = require("express");
const router = express.Router();
const authApiController = require("../../controller/api/authApiController");
const {
  requireAuth,
  checkUser,
  upload,
} = require("../../middleware/authMiddleware");

router.post("/signup", authApiController.signup);
router.post("/login", authApiController.login);
router.delete("/user/:_id", requireAuth, authApiController.delete_user);
module.exports = router;
