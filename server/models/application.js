const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      trim: true,
      enum: ["pending", "approved", "rejected", "under_review"],
      default: "pending",
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
    
    phone,
    nif,
    adress,
    municipality,
    postcode,
    languages: [
      {
        type: String,
        trim: true,
      },
    ],
    education_level,
    links,
    cv,
    about_me,
    about_announcement,
    pic,





  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
