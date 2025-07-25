const getClientMyApplications = async (req, res) => {
  try {
    res.render("client-my-applications", {
      title: "Candidaturas",
    });
  } catch (err) {
    console.error("Erro ao carregar a página Candidaturas:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getClientMyApplications };