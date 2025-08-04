// ../controllers/settings/my-companies.js

const Company = require("../../models/company");

const getMyCompaniesPage = async (req, res) => {
  try {
    // nota: usei lean porque evita carregar os metodos do mongo e como só quero apresentar informacao, faz todo o sentido e é mais eficiente
    const companies = await Company.find(
      { user_id: req.user._id }, // filtra empresas do utilizador atual
      { name: 1, municipality: 1, pic: 1 } // só inclui os campos necessários
    ).lean();
    console.log(companies);
    res.render("partials/settings/my-companies", {
      companies,
      layout: false, // desativa layout do express-ejs-layout (header,head e footer) porque é inserida via ajax na settings.ejs
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getMyCompaniesPage };
