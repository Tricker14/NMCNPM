const User = require("../../models/user");
const Category = require("../../models/category");
const Item = require("../../models/item");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = function (err) {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect username
  if (err.message === "incorrect username") {
    errors.username = "that username already exist";
  }

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  // duplicate errors
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(function ({ properties }) {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res) => {
  const { username, email, role, password, confirmation } = req.body;
  if (password === confirmation) {
    try {
      const name = null;
      const phone = null;
      const gender = null;
      const birthday = null;
      const image = null;

      const user = await User.create({ username, email, role, password, name, phone, gender, birthday, image });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  } else {
    let errors = { email: "", password: "", confirmation: "" };
    errors.confirmation = "Password and confirmation must match";
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(password)
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
