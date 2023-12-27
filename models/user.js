const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { Item } = require("../models/item");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", null],
  },
  birthday: {
    day: {
      type: Number,
      default: null
    },
    month: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      default: null
    },
  },
  image: {
    type: String,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "item",
    },
  ],
  persisted: {
    type: Number,
    default: 0,
  }
});

// fire a function before doc save to db
userSchema.pre("save", async function (next) {
  console.log(this.persisted)
    if(this.persisted === 0) {
      this.persisted = 1
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
      next();
    }
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

userSchema.pre("remove", async function (next) {
  await Item.deleteMany({ owner: this._id });
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
