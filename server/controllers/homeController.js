const getHome = async (req, res) => {
  try {
    res.render("home", {
      title: "Página Inicial",
    });
  } catch (err) {
    console.error("Erro ao carregar a página inicial:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getHome };
