const getresetpassword = async (req, res) => {
  try {
    res.render("resetpassword", {
      title: "Página de resetar password",
    });
  } catch (err) {
    console.error("Erro ao carregar a página:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getresetpassword };
