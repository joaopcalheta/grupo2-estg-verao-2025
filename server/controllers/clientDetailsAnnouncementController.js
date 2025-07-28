const Announcement = require("../models/announcement");

const getClientDetailsAnnouncement = async (req, res) => {
  try {
    const announcementId = req.query.id;
    if (!announcementId) {
      return res.status(400).send("ID do anúncio não foi fornecido.");
    }

    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      return res.status(404).send("Anúncio não encontrado.");
    }

    res.render("client-details-announcement", {
      title: "Detalhes do Anúncio",
      announcement
    });
  } catch (err) {
    console.error("Erro ao carregar a página Detalhes do Anúncio:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postClientSubmitApplication = async (req, res) => {
  try {
    // Lógica da candidatura caso o utilizador esteje logado
    res.send("Candidatura enviada!");
  } catch (err) {
    res.status(500).send("Erro ao enviar a candidatura");
  }
}

module.exports = {
  getClientDetailsAnnouncement,
  postClientSubmitApplication,
};
