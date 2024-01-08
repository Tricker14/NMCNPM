require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// routes and api
const authRoutes = require("./routes/authRoutes");
const authApi = require("./routes/api/authApi");
const itemsRoutes = require("./routes/items");
const itemsApi = require("./routes/api/itemsApi");
const categoriesRoutes = require("./routes/categories");
const categoriesApi = require("./routes/api/categoriesApi");
const bidsApi = require("./routes/api/bidsApi");
const usersRoutes = require("./routes/usersRoutes");
const usersApi = require("./routes/api/usersApi");
// const homeRoutes = require("./routes/homeRoutes");
const appRoutes = require("./routes/appRoutes");

const {
  requireAuth,
  checkUser,
  upload,
} = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.dbURI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false, // Set this option to false to suppress the deprecation warning
  })
  .then((result) => {
    app.listen(process.env.PORT);
    console.log("connected");
  })
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.post("*", checkUser);

app.use("/webid", authRoutes);
app.use("/api/webid", authApi);
app.use("/webid", itemsRoutes);
app.use("/api/webid", itemsApi);
app.use("/webid", categoriesRoutes);
app.use("/api/webid", categoriesApi);
app.use("/api/webid", bidsApi);
app.use("/webid", usersRoutes);
app.use("/api/webid", usersApi);
// app.use("/webid", homeRoutes);
app.use("/webid", appRoutes);

app.use(function (req, res, next) {
  if (req.statusCode === 400) {
    res.status(400);
    res.send("400 BAD REQUEST !");
    return;
  } else if (req.statusCode === 403) {
    res.status(403);
    res.send("403 NOT AUTHORIZED !");
    return;
  } else if (req.statusCode === 500) {
    res.status(500);
    res.send("500 INTERNAL SERVER ERROR !");
    return;
  }
  res.status(404);
  res.send("404 NOT FOUND !");
});
