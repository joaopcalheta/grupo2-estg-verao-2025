const Announcement = require("../models/announcement");
const expireAnnouncements = require("../utils/expireAnnouncements");
const getCompanyDetailsAnnouncement = async (req, res) => {
  try {
    await expireAnnouncements(); // Expira anúncios antes de carregar a página - verifica se data de fim ja passou e altera o estado para "Expirado"
    const announcementId = req.query.id;
    if (!announcementId) {
      return res.status(400).send("ID do anúncio não foi fornecido.");
    }

    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      return res.status(404).send("Anúncio não encontrado.");
    }

    res.render("company-details-announcement", {
      announcement,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCompanyDetailsAnnouncement };
