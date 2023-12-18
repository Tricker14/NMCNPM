const express = require("express");
const router = express.Router();
const authApiController = require("../../controller/api/authApiController");
const {
  requireAuth,
  checkUser,
  upload,
} = require("../../middleware/authMiddleware");
const { uploadUser } = require("../../middleware/fileUploadMiddleware");

router.post("/signup", authApiController.signup);
router.post("/login", authApiController.login);

module.exports = router;
