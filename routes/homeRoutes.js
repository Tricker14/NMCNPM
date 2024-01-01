const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/home/items", homeController.listing_get);

module.exports = router;