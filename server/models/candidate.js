const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    nif: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      default: "",
      trim: true,
    },
    postcode: {
      type: String,
      required: true,
      trim: true,
    },
    municipality: {
      type: String,
      required: true,
      trim: true,
    },
    education_level: {
      type: String,
      trim: true,
    },
    languages: [
      {
        type: String,
        trim: true,
      },
    ],
    cv: {
      type: String, // pode ser o caminho de um arquivo ou uma URL
      trim: true,
    },
    about_me: {
      type: String,
      trim: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("mongoose", candidateSchema);

module.exports = Candidate;
