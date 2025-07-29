const Application = require("../models/application");

const getCompanyCandidates = async (req, res) => {
  try {
    const { id } = req.query; //id do announcement
    const applications = await Application.find({ announcement_id: id });

    res.render("company-candidates", {
      title: "Página Candidatos",
      applications,
    });
  } catch (err) {
    console.error("Erro ao carregar a página Candidatos:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCompanyCandidates };
