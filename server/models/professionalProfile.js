const mongoose = require("mongoose");

const professionalProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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
      default: "",
    },
    skills: [
      {
        type: String,
        trim: true,
        default: "",
      },
    ],
    about_me: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        "O campo 'sobre mim' não pode exceder 1000 caracteres.",
      ],
      default: "",
    },
    cv: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const ProfessionalProfile = mongoose.model(
  "ProfessionalProfile",
  professionalProfileSchema
);

module.exports = ProfessionalProfile;
