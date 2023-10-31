require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.dbURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(process.env.PORT);
    console.log('connected');
  })
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.post('*', checkUser);
app.get('/', requireAuth, (req, res) => res.render('home'));
app.use(authRoutes);