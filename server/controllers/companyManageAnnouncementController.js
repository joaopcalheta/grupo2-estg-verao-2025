const getCompanyManageAnnouncement = async (req, res) => {
  try {
    res.render("company-manage-announcement", {
      title: "Página Gerir Anúncio",
    });
  } catch (err) {
    console.error("Erro ao carregar a página Gerir Anúncio:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCompanyManageAnnouncement };