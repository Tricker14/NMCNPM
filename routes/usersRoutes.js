const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const {
  requireAuth,
} = require("../middleware/authMiddleware");

router.get('/profile/:_id', requireAuth, userController.profile);

module.exports = router;