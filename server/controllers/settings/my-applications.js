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
    // 1. Buscar a candidatura antes de apagar
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Candidatura não encontrada" });
    }

    // 2. Se existir, decrementar o número de candidaturas no anúncio
    await Announcement.findByIdAndUpdate(
      application.announcement_id,
      { $inc: { numberOfApplications: -1 } }
    );

    res.redirect("/settings?section=my-applications");
  } catch (err) {
    console.error("Erro ao eliminar candidatura:", err);
    res.status(500).send("Erro interno no servidor");
  }
}

module.exports = {
  getMyApplicationsPage,
  deleteApplication,
};
