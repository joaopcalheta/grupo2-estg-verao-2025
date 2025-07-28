const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    nif: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    municipality: {
      type: String,
      trim: true,
    },
    postcode: {
      type: String,
      trim: true,
    },
    languages: [
      {
        type: String,
        trim: true,
      },
    ],
    education_level: {
      type: String,
      trim: true,
    },
    age: {
        type: String,
        trim: true,
   },
    cv: {
      type: String, // pode ser o caminho de um arquivo ou uma URL
      trim: true,
    },
    about_me: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
