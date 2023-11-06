const express = require("express");
const router = express.Router();
const itemsApiController = require("../../controller/api/itemsApiController");
const { requireAuth, checkUser } = require("../../middleware/authMiddleware");
const uploadMiddleware = require("../../middleware/fileUploadMiddleware.js");

router.post("/items", uploadMiddleware, itemsApiController.item_post);
module.exports = router;
