const getClientSubmit = async (req, res) => {
  try {
    res.render("client-submit", {
      title: "Página submeter candidatura",
    });
  } catch (err) {
    console.error("Erro ao carregar a página:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getClientSubmit };
