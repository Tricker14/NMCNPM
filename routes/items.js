const express = require("express");
const router = express.Router();
const itemsController = require("../controller/itemsController");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/fileUploadMiddleware");

router.get("/items", itemsController.listing_get);
router.get("/items/create", itemsController.item_create_page);
router.get("/items/:_id", itemsController.item_get);
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
  itemsController.create_item
);

module.exports = router;
