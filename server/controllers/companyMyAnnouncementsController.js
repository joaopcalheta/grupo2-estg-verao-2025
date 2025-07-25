const getCompanyMyAnnouncements = async (req, res) => {
  try {
    res.render("company-my-announcements", {
      title: "Página Meus Anúncios",
    });
  } catch (err) {
    console.error("Erro ao carregar a página Meus anúncios:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCompanyMyAnnouncements };
