const getMyProfileClient = async (req, res) => {
  try {
    res.render("myProfileClient", {
      title: "Meu Perfil",
    });
  } catch (err) {
    console.error("Erro ao carregar a página Meu Perfil:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getMyProfileClient };