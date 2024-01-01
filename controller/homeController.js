const { Item } = require("../models/item");

module.exports.listing_get = async function (req, res) {
    console.log('body ', req.query);
    const name = req.query.name;
    const regex = new RegExp(name, 'i');

    const theItems = []
    const items = await Item.find({ isListing: true, name: {$regex: regex} }).populate("owner");
    await items.forEach(async function (item) {
      tempItem = item.toObject();
      if (res.locals.user != null && res.locals.user.username === item.owner.username) {
        tempItem.isOwned = true;
      } else {
        tempItem.isOwned = false;
        tempItem.isFavorite = isFavorite(res.locals.user, item)
      }
      theItems.push(tempItem)
    });
    const message =
      req.query.delete != undefined ? "Deleted item successfully" : null;
    res.render("items/listing", {
      items: theItems,
      user: res.locals.user,
      message: message,
    });
  };