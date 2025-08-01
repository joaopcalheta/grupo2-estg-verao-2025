const Announcement = require("../models/announcement");
//const User = require("../models/user");
//const Company = require("../models/company");

const getHomeDetailsAnnouncement = async (req, res) => {
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

    res.render("home-details-announcement", {
      announcement
      //company,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};



module.exports = { getHomeDetailsAnnouncement };
