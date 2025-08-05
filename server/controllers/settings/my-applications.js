// ../controllers/settings/my-applications.js

const Application = require("../../models/application");
const Announcement = require("../../models/announcement");

const getMyApplicationsPage = async (req, res) => {
  try {
    const applications = await Application.find({ user_id: req.user._id })
      .populate("announcement_id");

    res.render("partials/settings/my-applications", {
      applications,
      layout: false, // desativa layout do express-ejs-layout (header,head e footer) porque é inserida via ajax na settings.ejs
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteApplication = async (req, res) => {
  try {
    const applicationId = req.query.id;
    const userId = req.user._id;

    const result = await Application.findOneAndDelete({
      _id: applicationId,
      user_id: userId
    });

    if (!result) {
      return res.status(404).send("Candidatura não encontrada");
    }

    return res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacaoRemocao', 'true');
        window.location.href = '/settings?section=my-applications';
      </script>
    `);

  } catch (err) {
    console.error("Erro ao eliminar candidatura:", err);
    res.status(500).send("Erro interno no servidor");
  }
}

module.exports = {
  getMyApplicationsPage,
  deleteApplication,
};
