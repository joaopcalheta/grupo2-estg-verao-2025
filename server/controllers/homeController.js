const Announcement = require("../models/announcement");

const getHome = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.render("home", {
      title: "Página Inicial",
      announcements, // passa os dados
    });
  } catch (err) {
    console.error("Erro ao carregar página inicial:", err);
    res.status(500).send("Erro ao carregar página inicial");
  }
};

module.exports = { getHome };

