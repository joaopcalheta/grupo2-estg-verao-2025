// ../controllers/settings/professional-profile.js

const ProfessionalProfile = require("../../models/professionalProfile");

const getProfessionalProfilePage = async (req, res) => {
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

    res.render("partials/settings/professional-profile", {
      title: "Dados Profissionais",
      profile,
      layout: false, // desativa layout do express-ejs-layout (header,head e footer) porque é inserida via ajax na settings.ejs
    });
  } catch (err) {
    console.error("Erro ao carregar a página Dados Profissionais:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postProfessionalProfileData = async (req, res) => {
  try {
    const { languages = [], education_level, skills = [], about_me } = req.body;

    const langArray = Array.isArray(languages) ? languages : [languages];
    // skills pode vir como string separada por vírgulas
    let skillsArray;
    if (Array.isArray(skills)) {
      skillsArray = skills;
    } else if (typeof skills === "string") {
      skillsArray = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      skillsArray = [];
    }

    const update = {
      languages: langArray.filter(Boolean),
      education_level: education_level || "",
      skills: skillsArray,
      about_me: about_me || "",
    };

    await ProfessionalProfile.findOneAndUpdate(
      { user_id: req.user._id },
      update,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacaoPerfilAtt', 'true');
        window.location.href = '/settings?section=professional-profile';
      </script>
    `);
  } catch (err) {
    console.error("Erro ao atualizar perfil profissional:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = {
  getProfessionalProfilePage,
  postProfessionalProfileData,
};
