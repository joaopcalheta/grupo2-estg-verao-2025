const getCompanyCandidates = async (req, res) => {
  try {
    res.render("company-candidates", {
      title: "Página Candidatos",
    });
  } catch (err) {
    console.error("Erro ao carregar a página Candidatos:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCompanyCandidates };
