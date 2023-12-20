const express = require("express");
const router = express.Router();
const {
  requireAuth,
  checkUser,
  upload,
} = require("../middleware/authMiddleware");

/* GET home page. */
router.get("/", function (req, res, next) {
  const email = res.locals.user === null ? "" : res.locals.user.email;
  res.send("this will be index page");
});

router.get("/home", function (req, res, next) {
  const user = res.locals.user === null ? null : res.locals.user;
  res.render("home", { user: user });
});

module.exports = router;
