

const getMyProfileProfessionalData = async (req, res) => {
  try {

    res.render("my-profile-professional-data", {
      title: "Dados Profissionais",
      profile,
    });
  } catch (err) {
    console.error("Erro ao carregar a página Dados Profissionais:", err);
    res.status(500).send("Erro interno no servidor");
  }
};


module.exports = {
  getMyProfileProfessionalData,
};
