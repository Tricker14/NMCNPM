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
router.delete("/user/:_id", requireAuth, authApiController.delete_user);
router.post('/profile', 
  requireAuth, 
  uploadUser.single('image'),
  authApiController.profile);

module.exports = router;
