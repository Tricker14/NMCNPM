const express = require("express");
const router = express.Router();
const itemsController = require("../controller/itemsController");
const {
  requireAuth,
  checkUser,
  upload,
} = require("../middleware/authMiddleware");

router.get("/items", itemsController.listing_get);
router.get("/items/create", itemsController.item_create_page);
router.get("/items/:_id", itemsController.item_get);

module.exports = router;
