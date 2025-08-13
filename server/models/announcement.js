// models/announcement.js
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    job_name: {
      type: String,
      required: [true, "O nome do trabalho é obrigatório."],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    end_date: {
      type: Date,
      required: [true, "A data de término é obrigatória."],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "A data de término deve ser futura.",
      },
    },
    category: {
      type: String,
      required: [true, "A categoria é obrigatória."],
      trim: true,
    },
    schedule: {
      startTime: {
        type: String,
        trim: true,
      },
      endTime: {
        type: String,
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
      min: [0, "O salário não pode ser negativo."],
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
      match: /^[0-9]{4}-[0-9]{3}$/,
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
      required: [true, "A descrição é obrigatória."],
      minlength: 10,
    },
    pic: {
      type: String,
      trim: true,
    },
    numberOfApplications: {
      type: Number,
      default: 0,
    },
    numberOfPositions: {
      type: Number,
      required: [true, "O número de vagas é obrigatório."],
      min: [1, "Deve haver pelo menos uma vaga."],
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    qrcode_pic: {
      type: String,
      trim: true,
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
