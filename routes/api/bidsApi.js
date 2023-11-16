const express = require("express");
const router = express.Router();
const bidsApiController = require("../../controller/api/bidsApiController");
const { requireAuth, checkUser } = require("../../middleware/authMiddleware");

router.post("/bids/:_id", requireAuth, bidsApiController.bid_post);
//router.delete("/bids", bidsApiController.bid_delete);
module.exports = router;