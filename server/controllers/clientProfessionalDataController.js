const Candidate = require("../models/candidate");

const getClientProfessionalData = async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ user_id: req.user._id });
    res.render("client-professional-data", {
      title: "Dados Profissionais",
      candidate,
    });
  } catch (err) {
    console.error("Erro ao carregar a página Dados Profissionais:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postClientProfessionalData = async (req, res) => {
  const data = { ...req.body, user_id: req.user._id };

  await CandidateProfile.findOneAndUpdate(
    { user_id: req.user._id },
    data,
    { upsert: true, new: true }
  );

  res.redirect("/client-professional-data");
};

module.exports = {
  getClientProfessionalData,
  postClientProfessionalData,
};