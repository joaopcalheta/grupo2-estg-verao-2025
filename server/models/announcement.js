// models/announcement.js
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    job_name: {
      type: String,
      required: true,
      trim: true,
    },
    end_date: {
      type: Date, // ou Date
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    schedule: {
      startTime: {
        type: String, // ou Date
        trim: true,
      },
      endTime: {
        type: String, // ou Date
        trim: true,
      },
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
    freg: {
      type: String,
      trim: true,
    },
    address: {
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
    description: {
      type: String,
      trim: true,
      required: true,
    },
    pic: {
      type: String,
      trim: true,
    },
    numberOfPositions: {
      type: String, // or Number
      required: true,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    state: {
      type: String,
      enum: ["Ativo", "Desativado", "Expirado"],
      default: "Ativo",
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
