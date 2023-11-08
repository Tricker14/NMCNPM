const express = require("express");
const router = express.Router();
const itemsApiController = require("../../controller/api/itemsApiController");
const { requireAuth, checkUser } = require("../../middleware/authMiddleware");
const { upload } = require("../../middleware/fileUploadMiddleware");

router.post(
  "/items",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "previewImages",
      maxCount: 5,
    },
  ]),
  itemsApiController.item_post
);
router.delete("/items/:_id", itemsApiController.delete_item);
module.exports = router;
