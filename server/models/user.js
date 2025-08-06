// server/models/user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default: "",
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    nif: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,

      default: "",
      trim: true,
    },
    postcode: {
      type: String,

      trim: true,
    },
    municipality: {
      type: String,

      trim: true,
    },
    birthdate: {
      type: Date,

      trim: true,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
