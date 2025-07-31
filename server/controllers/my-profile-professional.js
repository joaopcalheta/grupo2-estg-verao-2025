const Candidate = require("../models/candidate");

const getMyProfileProfessional = async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ user_id: req.user._id });
    res.render("my-profile-professional", {
      title: "Dados Profissionais",
      candidate,
    });
  } catch (err) {
    console.error("Erro ao carregar a página Dados Profissionais:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postMyProfileProfessional = async (req, res) => {
  const data = { ...req.body, user_id: req.user._id };

  await CandidateProfile.findOneAndUpdate({ user_id: req.user._id }, data, {
    upsert: true,
    new: true,
  });

  res.redirect("/my-profile-professional");
};

module.exports = {
  getMyProfileProfessional,
  postMyProfileProfessional,
};
