const express = require("express");
const router = express.Router();
const bidsApiController = require("../../controller/api/bidsApiController");

router.post("/bids/:_id", bidsApiController.bid_post);
// router.delete("/bids", bidsApiController.bid_delete);
module.exports = router;