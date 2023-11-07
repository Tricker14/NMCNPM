const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.get("/items/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const item = await Item.findById(id).populate("owner");
    console.log(item.owner);
    res.render("test/item-details", {
      item: item,
    });
  } catch (e) {
    //can occur CastError: Cast to ObjectId failed for value "create" (type string) at path "_id" for model "item"
    res.send("Something went wrong");
    return;
  }
});
module.exports = router;
