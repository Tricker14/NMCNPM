const express = require("express");
const { Item } = require("../models/item");
const router = express.Router();
const {
  requireAuth,
  checkUser,
  upload,
} = require("../middleware/authMiddleware");

function isFavorite(user, item){
  if(user != null){
    if(user.favorites.length == 0){
      return false;
    }
    else{
      let count = 0;
      user.favorites.forEach(favorite=>{
        if(favorite.equals(item._id)){
          count = 1;
        }
      })
      if(count === 0){
        return false
      }
      else{
        return true;
      }
    }
  }else{
    return false;
  }
  
}

/* GET home page. */
router.get("/", function (req, res, next) {
  const email = res.locals.user === null ? "" : res.locals.user.email;
  res.send("this will be index page");
});

router.get("/home", async function (req, res, next) {
  const user = res.locals.user === null ? null : res.locals.user;

  const theItems = []
  const items = await Item.find({ isListing: true }).populate("owner").limit(5);
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

  let count = 0;
  items.forEach(function (item){
    if(item.isListing === true){
      count++;
    }
  });
  res.render("home", { 
    user: user,
    items: theItems,
    user: res.locals.user,
    message: message,
    count: count,
  });
});

module.exports = router;
