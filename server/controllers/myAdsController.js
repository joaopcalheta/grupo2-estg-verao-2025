const getMyAds = async (req, res) => {
  try {
    res.render("myAds", {
      title: "Página Meus Anúncios",
    });
  } catch (err) {
    console.error("Erro ao carregar a página Meus anúncios:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getMyAds };
