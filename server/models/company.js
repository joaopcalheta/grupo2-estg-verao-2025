const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    admin_usernames: [
      {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 3,
      },
    ],
    company_email: {
      type: String,
      required: [true, "O e-mail é obrigatório."],
      lowercase: true,
      trim: true,
      unique: true,
      maxlength: [100, "O e-mail não pode ter mais que 100 caracteres."],
      match: [/^\S+@\S+\.\S+$/, "Formato de e-mail inválido."],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?[0-9\s\-().]{6,20}$/.test(v);
        },
        message: (props) =>
          `${props.value} não é um número de telefone válido.`,
      },
    },
    nif: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return Number.isInteger(v) && v.toString().length === 9;
        },
        message: (props) =>
          `${props.value} não é um NIF válido (deve ter 9 dígitos).`,
      },
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
      validate: {
        validator: function (v) {
          return /^\d{4}-\d{3}$/.test(v); // formato português
        },
        message: (props) =>
          `${props.value} não é um código postal válido (ex: 1234-567).`,
      },
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
      maxlength: 3000,
    },
    pic: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => {
          if (!v) return true; // permitir vazio
          return /^https?:\/\//i.test(v) || v.startsWith("/uploads/");
        },
        message: (props) => `${props.value} não é uma imagem válida.`,
      },
    },
  },
  {
    timestamps: true,
  }
);

companySchema.path("admin_usernames").validate(function (value) {
  return Array.isArray(value) && value.length > 0;
}, "Deve haver pelo menos um administrador associado.");

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
