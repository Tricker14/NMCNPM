const express = require("express");
const router = express.Router();
const itemsApiController = require("../../controller/api/itemsApiController");
const {
  requireAuth,
  checkUser,
  upload,
} = require("../../middleware/authMiddleware");

router.post("/items", upload.single("image"), itemsApiController.item_post);
module.exports = router;
