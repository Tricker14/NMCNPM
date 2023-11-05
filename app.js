require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// routes and api
const authRoutes = require("./routes/authRoutes");
const itemsRoutes = require("./routes/items");
const itemsApi = require("./routes/api/itemsApi");
const categoriesRoutes = require("./routes/categories");
const categoriesApiRoutes = require("./routes/api/categoriesApi");

const {
  requireAuth,
  checkUser,
  upload,
} = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.static("images"));
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
  })
  .then((result) => {
    app.listen(process.env.PORT);
    console.log("connected");
  })
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.post("*", checkUser);
app.get("/", requireAuth, (req, res) => res.render("home"));
app.use("/webid", authRoutes);
app.use("/webid", itemsRoutes);
app.use("/webid", itemsApi);
app.use("/webid", categoriesRoutes);
