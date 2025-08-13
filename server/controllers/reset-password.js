const getResetPassword = async (req, res) => {
  try {
    res.render("reset-password", {
      title: "Página de reset password",
    });
  } catch (err) {
    console.error("Erro ao carregar a página:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getResetPassword };
