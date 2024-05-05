const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const { requireAuth, checkUser, checkAdmin } = require("../middleware/authMiddleware");

// router.get("/admin", requireAuth, checkAdmin, adminController.adminPage);
// router.get("/admin/:year", requireAuth, checkAdmin, adminController.revenueByYear);

router.get("/admin", adminController.adminPage);
router.get("/admin/linechart/:year", adminController.revenueByYear);
router.get("/admin/piechart/:year", adminController.revenueByCategory);

module.exports = router;