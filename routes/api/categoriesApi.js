const express = require("express");
const router = express.Router();
const categoriesApiController = require("../../controller/api/categoriesApiController");
const {
  requireAuth,
  checkUser,
  upload,
} = require("../../middleware/authMiddleware");

router.post("/categories", categoriesApiController.category_post);
module.exports = router;
