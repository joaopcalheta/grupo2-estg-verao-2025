// controllers/createCompanyCreateAnnouncementController.js

const Announcement = require("../models/announcement");

const getCompanyCreateAnnouncement = async (req, res) => {
  try {
    res.render("company-create-announcement", {
      title: "Página Criar Anúncio",
    });
  } catch (err) {
    console.error("Erro ao carregar a página Criar Anúncio:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postCompanyCreateAnnouncement = async (req, res) => {
  try {
    const {
      job_name,
      category,
      schedule,
      type,
      municipality,
      freg,
      address,
      postcode,
      regime,
      education_level,
      languages,
      salary,
      end_date,
      description,
      pic,
    } = req.body;

    console.log("Dados recebidos:", req.body);

    const newAnnouncement = new Announcement({
      user_id: req.user._id,
      job_name,
      category,
      type,
      municipality,
      freg,
      address,
      postcode,
      regime,
      education_level,
      schedule,
      languages,
      salary,
      end_date,
      description,
      pic,
    });

    await newAnnouncement.save();

    res.send("Anúncio criado com sucesso!");
  } catch (err) {
    console.error("Erro ao criar anúncio:", err);
    res.status(500).send("Erro ao criar anúncio");
  }
};

module.exports = {
  getCompanyCreateAnnouncement,
  postCompanyCreateAnnouncement,
};
