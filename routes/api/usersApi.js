const express = require("express");
const router = express.Router();
const userApiController = require("../../controller/api/userApiController");
const {
  requireAuth,
} = require("../../middleware/authMiddleware");
const { uploadUser } = require("../../middleware/fileUploadMiddleware");

router.delete("/user/:_id", requireAuth, userApiController.delete_user);
router.post('/profile/:_id', 
  requireAuth, 
  uploadUser.single('image'),
  userApiController.profile);

module.exports = router;
