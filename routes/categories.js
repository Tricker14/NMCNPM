const express = require("express");
const router = express.Router();
const categoriesController = require("../controller/categoriesController");
const {
  requireAuth,
  checkUser,
  upload,
} = require("../middleware/authMiddleware");

router.get("/categories", categoriesController.category_get_all);
router.get("/categories/:_id", categoriesController.category_get);

module.exports = router;
