const Application = require("../models/application");

const getCompanyAnnouncementCandidates = async (req, res) => {
  try {
    const { id } = req.query; //id do announcement

    const applications = await Application.find({ announcement_id: id })
      .populate({ path: "user_id", select: "avatar name" })
      .lean();

    res.render("company-announcement-candidates", {
      applications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCompanyAnnouncementCandidates };
