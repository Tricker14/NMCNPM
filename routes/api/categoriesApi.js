const express = require("express");
const router = express.Router();
const categoriesApiController = require("../../controller/api/categoriesApiController");
const { uploadCategory } = require("../../middleware/fileUploadMiddleware");
const {
  requireAuth,
  checkUser,
  upload,
} = require("../../middleware/authMiddleware");

router.post("/categories", 
  requireAuth, 
  uploadCategory.single('image'),
  categoriesApiController.category_post);
  
module.exports = router;
