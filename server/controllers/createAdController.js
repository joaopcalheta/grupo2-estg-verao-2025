const getCreateAd = async (req, res) => {
  try {
    res.render("createAd", {
      title: "Página Criar Anúncio",
    });
  } catch (err) {
    console.error("Erro ao carregar a página Criar Anúncio:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCreateAd };