const getMyCandClient = async (req, res) => {
  try {
    res.render("myCandClient", {
      title: "Candidaturas",
    });
  } catch (err) {
    console.error("Erro ao carregar a página Candidaturas:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getMyCandClient };