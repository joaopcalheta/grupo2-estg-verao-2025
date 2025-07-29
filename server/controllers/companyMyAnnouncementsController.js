const Announcement = require("../models/announcement");

const getCompanyMyAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.render("company-my-announcements", {
      title: "Página Meus Anúncios",
      announcements, // passa os dados
    });
  } catch (err) {
    console.error("Erro ao carregar a página Meus anúncios:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCompanyMyAnnouncements };
