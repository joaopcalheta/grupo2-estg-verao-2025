const Announcement = require("../models/announcement");

const getCompanyManageAnnouncement = async (req, res) => {
  try {
    const announcementId = req.query.id;
    if(!announcementId) {
      return res.status(400).send("ID do anúncio não foi fornecido");
    }

    const announcement = await Announcement.findById(announcementId);
    if(!announcement) {
      return res.status(404).send("Anúncio não foi encontrado");
    }

    res.render("company-manage-announcement", {
      title: "Página Gerir Anúncio",
      announcement
    });
  } catch (err) {
    console.error("Erro ao carregar a página Gerir Anúncio:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const updateCompanyAnnouncement = async (req, res) => {
  try {
    const announcementId = req.query.id;
    if (!announcementId) {
      return res.status(400).send("ID do anúncio não foi fornecido");
    }

    const updateData = req.body;

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      announcementId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).send("Anúncio não foi encontrado");
    }

    res.redirect(`/company-my-announcements?id=${announcementId}`);
  } catch (err) {
    console.error("Erro ao atualizar anúncio:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCompanyManageAnnouncement, updateCompanyAnnouncement };
