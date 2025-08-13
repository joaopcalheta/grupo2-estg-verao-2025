const getApagarCompanyMyProfile = async (req, res) => {
  try {
    res.render("apagar_company-my-profile", {
      title: "Minha conta",
    });
  } catch (err) {
    console.error("Erro ao carregar a página:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getApagarCompanyMyProfile };
