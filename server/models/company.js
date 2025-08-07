// ../models/company.js

const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    admin_usernames: [
      {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
    ],
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    nif: {
      type: Number,
      required: true,
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
    about_us: {
      type: String,
      default: "",
      trim: true,
    },
    pic: {
      type: String,
      trim: true,
    },

    // isto ja nem deve ser preciso

    /*
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },*/
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
