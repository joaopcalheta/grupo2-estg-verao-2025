const Application = require("../models/application");

const getCompanyDetailsCandidate = async (req, res) => {
  try {
    const candidateId = req.query.id;
    if (!candidateId) {
      return res.status(400).send("ID do anúncio não foi fornecido.");
    }

    const application = await Application.findById(candidateId);
    if (!application) {
      return res.status(404).send("Candidato não encontrado.");
    }

    res.render("company-details-candidate", {
      application,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCompanyDetailsCandidate };