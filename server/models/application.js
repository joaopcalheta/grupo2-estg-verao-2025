const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    /*state: {
      type: String,
      required: true,
      trim: true,
      enum: ["pending", "approved", "rejected", "under_review"],
      default: "pending",
    },*/
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
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[0-9\s\-()]{7,20}$/, "Número de telefone inválido"],
    },
    nif: {
      type: String,
      trim: true,
      match: [/^\d{9}$/, "NIF inválido (deve ter 9 dígitos)"],
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
      match: [/^\d{4}-\d{3}$/, "Código postal inválido (ex: 1234-567)"],
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
    birthdate: {
      type: String,
      trim: true,
      match: [
        /^\d{4}-\d{2}-\d{2}$/,
        "Data de nascimento inválida (formato YYYY-MM-DD)",
      ],
      validate: {
        validator: function (value) {
          const date = new Date(value);
          const now = new Date();
          return date < now;
        },
        message: "A data de nascimento deve estar no passado",
      },
    },
    cv: {
      type: String,
      trim: true,
    },
    about_me: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    skills: [
      {
        type: String,
        trim: true,
        minlength: 1,
      },
    ],
    announcement_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Announcement",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
