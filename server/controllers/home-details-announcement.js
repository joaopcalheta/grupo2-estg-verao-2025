const Announcement = require("../models/announcement");
//const Company = require("../models/company");

const getHomeDetailsAnnouncement = async (req, res) => {
  try {
    const announcementId = req.query.id;
    if (!announcementId) {
      return res.status(400).send("ID do anúncio não foi fornecido.");
    }

    const announcement = await Announcement.findById(announcementId)
    .populate({
      path: "company_id",
      select: "name phone nif address postcode municipality about_us pic",
    })
    .lean();

    if (!announcement) {
      return res.status(404).send("Anúncio não encontrado.");
    }

    res.render("home-details-announcement", {
      announcement,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getHomeDetailsAnnouncement };
