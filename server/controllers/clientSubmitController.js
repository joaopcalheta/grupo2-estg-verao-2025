// controllers/clientSubmitController.js

const Application = require("../models/application");
const ProfessionalProfile = require("../models/professionalProfile");
const User = require("../models/user");

const getClientSubmitApplication = async (req, res) => {
  try {
    const { id } = req.query;
    let user = null;
    let profile = null;

    if (req.isAuthenticated()) {
      user = await User.findById(req.user._id);
      profile = await ProfessionalProfile.findOne({ user_id: req.user._id });
    }

    res.render("client-submit", {
      title: "Página submeter candidatura",
      announcementId: id,
      user,
      profile,
    });
  } catch (err) {
    console.error("Erro ao carregar a página:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postClientSubmitApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      nif,
      address,
      municipality,
      postcode,
      languages,
      education_level,
      age,
      cv,
      about_me,

    } = req.body;

    console.log("Dados recebidos:", req.body);

    const newApplication = new Application({
      announcement_id: req.body.announcement_id,
      name,
      email,
      phone,
      nif,
      address,
      municipality,
      postcode,
      languages,
      education_level,
      age,
      cv,
      about_me,
    });

    await newApplication.save();

    res.send("Candidatura enviada com sucesso!");
  } catch (err) {
    console.error("Erro ao enviar candidatura:", err);
    res.status(500).send("Erro ao enviar candidatura");
  }
};  

module.exports = { 
  getClientSubmitApplication,
  postClientSubmitApplication,
};
