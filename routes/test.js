const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.get("/items/:id", async (req, res) => {
  const id = req.params.id;
  const create =
    req.query.create !== undefined ? "Created item successfully" : null;
  const update =
    req.query.create !== undefined ? "Updated item successfully" : null;
  try {
    const item = await Item.findById(id).populate("owner");
    res.render("test/item-details", {
      item: item,
      createMessage: create,
      updateMessage: update,
    });
  } catch (e) {
    //can occur CastError: Cast to ObjectId failed for value "create" (type string) at path "_id" for model "item"
    res.send("Something went wrong");
    return;
  }
});
module.exports = router;
