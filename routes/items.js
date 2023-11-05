const express = require("express");
const router = express.Router();
const itemsController = require("../controller/itemsController");
const {
  requireAuth,
  checkUser,
  upload,
} = require("../../middleware/authMiddleware");

router.get("/listing", itemsController.listing_get);
router.get("/item/:_id", itemsController.item_get);
router.get("/create", itemsController.item_create_page);
