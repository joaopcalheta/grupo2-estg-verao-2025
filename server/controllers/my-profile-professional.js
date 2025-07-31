const ProfessionalProfile = require("../models/professionalProfile");

const getProfessionalDataPage = async (req, res) => {
  try {
    let profile = await ProfessionalProfile.findOne({
      user_id: req.user._id,
    });
    if (!profile) {
      // cria vazio se não existir (opcional)
      profile = new ProfessionalProfile({ user_id: req.user._id });
      await profile.save();
    }

    res.render("client-professional-data", {
      title: "Dados Profissionais",
      profile,
    });
  } catch (err) {
    console.error("Erro ao carregar a página Dados Profissionais:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const updateProfessionalData = async (req, res) => {
  try {
    const {
      languages = [],
      education_level,
      skills,
      about_me,
    } = req.body;

    let profile = await ProfessionalProfile.findOne({
      user_id: req.user._id,
    });

    if (!profile) {
      profile = new ProfessionalProfile({ user_id: req.user._id });
    }

    profile.languages = Array.isArray(languages)
      ? languages
      : languages
      ? [languages]
      : [];
    profile.education_level = education_level || profile.education_level;
    profile.skills = skills || profile.skills;
    profile.about_me = about_me || profile.about_me;

    await profile.save();

    res.json({ success: true, profile });
  } catch (err) {
    console.error("Erro ao atualizar dados profissionais:", err);
    res.status(500).send("Erro ao atualizar dados profissionais");
  }
};

module.exports = {
  getProfessionalDataPage,
  updateProfessionalData,
};
