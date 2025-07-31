// controllers/clientSubmitController.js

const Application = require("../models/application");
const Candidate = require("../models/candidate");

const getClientSubmitApplication = async (req, res) => {
  try {
    const { id } = req.query;
    const candidate = await Candidate.findOne({ user_id: req.user._id });

    res.render("client-submit", {
      title: "Página submeter candidatura",
      announcementId: id,
      candidate,
      user: req.user,
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
