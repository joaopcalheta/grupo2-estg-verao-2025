// server/controllers/my-profile-my-companies.js

const Company = require("../models/company");

const getMyProfileMyCompanies = async (req, res) => {
  try {
    // nota: usei lean porque evita carregar os metodos do mongo e como só quero apresentar informacao, faz todo o sentido e é mais eficiente
    const companies = await Company.find({ name: 1, municipality: 1 }).lean();

    res.render("my-profile-my-companies", { companies });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getMyProfileMyCompanies };
