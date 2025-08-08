// ../controllers/company-my-announcements.js

const Announcement = require("../models/announcement");
const Company = require("../models/company");

const expireAnnouncements = require("../utils/expireAnnouncements");

const getCompanyMyAnnouncements = async (req, res) => {
  try {
    await expireAnnouncements(); // Expira anúncios antes de carregar a página - verifica se data de fim ja passou e altera o estado para "Expirado"

    const companyID = req.params.companyID;

    if (!companyID) {
      return res.status(400).send("ID da empresa não encontrado");
    }

    const company = await Company.findById(companyID);

    if (!company) {
      return res.status(404).send("Empresa não encontrada");
    }
    const announcements = await Announcement.find({
      company_id: companyID,
    }).sort({ createdAt: -1 }); // ordena por data de criação, do mais recente para o mais antigo

    res.render("company-my-announcements", {
      announcements,
      company,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCompanyMyAnnouncements };
