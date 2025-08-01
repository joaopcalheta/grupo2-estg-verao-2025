// controllers/my-profile-professional-data.js

const ProfessionalProfile = require("../models/professionalProfile");

const getMyProfileProfessionalData = async (req, res) => {
  try {
    let profile = await ProfessionalProfile.findOne({ user_id: req.user._id });
    if (!profile) {
      profile = {
        languages: [],
        education_level: "",
        skills: [],
        about_me: "",
        cv: "",
      };
    }

    res.render("my-profile-professional-data", {
      title: "Dados Profissionais",
      profile,
    });
  } catch (err) {
    console.error("Erro ao carregar a página Dados Profissionais:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postUpdateProfessionalData = async (req, res) => {
  try {
    const { languages = [], education_level, skills = [], about_me } = req.body;

    const langArray = Array.isArray(languages) ? languages : [languages];
    const skillsArray = Array.isArray(skills) ? skills : [skills];

    const update = {
      languages: langArray.filter(Boolean),
      education_level: education_level || "",
      skills: skillsArray.filter(Boolean),
      about_me: about_me || "",
    };

    const profile = await ProfessionalProfile.findOneAndUpdate(
      { user_id: req.user._id },
      update,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacaoPerfilAtt', 'true');
        window.location.href = '/my-profile-professional-data';
      </script>
    `);
  } catch (err) {
    console.error("Erro ao atualizar perfil profissional:", err);
    res.status(500).send("Erro interno no servidor");
  }
};


module.exports = {
  getMyProfileProfessionalData,
  postUpdateProfessionalData,
};
