const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    job_name: {
      type: String,
      required: true,
      trim: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    schedule: {
      type: String,
      trim: true,
    },
    regime: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    salary: {
      type: Number,
    },
    municipality: {
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
    description: {
      type: String,
      trim: true,
      required: true,
    },
    pic: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Company", announcementSchema);

module.exports = Announcement;
