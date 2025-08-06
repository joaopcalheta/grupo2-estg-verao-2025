// ../controllers/company-create-announcement.js

const Announcement = require("../models/announcement");

const getCompanyCreateAnnouncement = async (req, res) => {
  try {
    const companyID = req.params.companyID;
    res.render("company-create-announcement", { companyID });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postCompanyCreateAnnouncement = async (req, res) => {
  try {
    const {
      job_name,
      category,
      schedule,
      type,
      municipality,
      freg,
      address,
      postcode,
      regime,
      education_level,
      languages,
      salary,
      end_date,
      numberOfPositions,
      description,
      pic,
      state,
    } = req.body;

    console.log("Dados recebidos:", req.body);

    const newAnnouncement = new Announcement({
      job_name,
      category,
      type,
      municipality,
      freg,
      address,
      postcode,
      regime,
      education_level,
      schedule,
      languages,
      salary,
      end_date,
      numberOfPositions,
      description,
      pic,
      state,
      company_id: req.params.companyID,
      user_id: req.user._id,
    });

    await newAnnouncement.save();

    res.send(`
  <script>
  sessionStorage.setItem('mostrarNotificacao', 'true');
      // Redireciona para a página de destino
      window.location.href = '/company-my-announcements/${req.params.companyID}';
  </script>
`);
  } catch (err) {
    console.error("Erro ao criar anúncio:", err);
    res.status(500).send("Erro ao criar anúncio");
  }
};

module.exports = {
  getCompanyCreateAnnouncement,
  postCompanyCreateAnnouncement,
};
