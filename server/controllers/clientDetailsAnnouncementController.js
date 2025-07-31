const Announcement = require("../models/announcement");
//const User = require("../models/user");
//const Company = require("../models/company");

const getClientDetailsAnnouncement = async (req, res) => {
  try {
    const announcementId = req.query.id;
    if (!announcementId) {
      return res.status(400).send("ID do anúncio não foi fornecido.");
    }

    const announcement = await Announcement.findById(announcementId); //.populate("user_id");
    if (!announcement) {
      return res.status(404).send("Anúncio não encontrado.");
    }

    //const company = await Company.findOne({ user_id: announcement.user_id._id });

    res.render("client-details-announcement", {
      title: "Detalhes do Anúncio",
      announcement
      //company,
    });
  } catch (err) {
    console.error("Erro ao carregar a página Detalhes do Anúncio:", err);
    res.status(500).send("Erro interno no servidor");
  }
};



module.exports = { getClientDetailsAnnouncement };
