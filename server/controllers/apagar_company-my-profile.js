const getApagarCompanyMyProfile = async (req, res) => {
  try {
    res.render("apagar_company-my-profile", {
      title: "Meu Perfil",
    });
  } catch (err) {
    console.error("Erro ao carregar a página Meu Perfil:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getApagarCompanyMyProfile };