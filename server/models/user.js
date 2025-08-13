// server/models/user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "O nome é obrigatório."],
      trim: true,
      minlength: [2, "O nome deve ter pelo menos 2 caracteres."],
      maxlength: [50, "O nome não pode ter mais que 50 caracteres."],
    },
    username: {
      type: String,
      required: [true, "O nome do utilizador é obrigatório."],
      lowercase: true,
      trim: true,
      unique: true,
      minlength: [3, "O nome do utilizador deve ter pelo menos 3 caracteres."],
      maxlength: [
        30,
        "O nome do utilizador não pode ter mais que 30 caracteres.",
      ],
      match: [
        /^[a-z0-9_.-]+$/,
        "O nome do utilizador contém caracteres inválidos.",
      ],
    },
    email: {
      type: String,
      required: [true, "O e-mail é obrigatório."],
      lowercase: true,
      trim: true,
      unique: true,
      maxlength: [100, "O e-mail não pode ter mais que 100 caracteres."],
      match: [/^\S+@\S+\.\S+$/, "Formato de e-mail inválido."],
    },
    password: {
      type: String,
      required: [true, "A senha é obrigatória."],
      minlength: [6, "A senha deve ter pelo menos 6 caracteres."],
    },
    pic: {
      type: String,
      default: "",
      trim: true,
      maxlength: [
        255,
        "O link da imagem não pode ter mais que 255 caracteres.",
      ],
    },
    phone: {
      type: String,
      trim: true,
      default: "",
      match: [/^\+?[0-9]{9,15}$/, "Número de telefone inválido."],
    },
    nif: {
      type: String,
      trim: true,
      default: "",
      match: [/^\d{9}$/, "NIF deve conter exatamente 9 dígitos."],
    },
    address: {
      type: String,
      default: "",
      trim: true,
      maxlength: [200, "O endereço não pode ter mais que 200 caracteres."],
    },
    postcode: {
      type: String,
      trim: true,
      match: [/^\d{4}-\d{3}$/, "Código postal deve estar no formato 1234-567."],
    },
    municipality: {
      type: String,
      trim: true,
      maxlength: [100, "O município não pode ter mais que 100 caracteres."],
    },
    birthdate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "A data de nascimento deve ser no passado.",
      },
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    avatar: {
      type: String,
      default: "/images/my-account.png",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
