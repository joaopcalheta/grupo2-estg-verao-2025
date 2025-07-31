const User = require("../models/user");

const getClientMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.render("client-my-profile", {
      title: "Meu Perfil",
      user,
    });
  } catch (err) {
    console.error("Erro ao carregar a página Meu Perfil:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postClientMyProfile = async (req, res) => {
  try {
    const { name, username, phone, nif, email, password, newPassword } =
      req.body;

    await User.findByIdAndUpdate(req.user._id, {
      name,
      username,
      phone,
      nif,
      email,
      ...(newPassword && { password: newPassword }),
    });

    res.redirect("/client-my-profile");
  } catch (err) {
    console.error("Erro ao atualizar perfil:", err);
    res.status(500).send("Erro interno ao atualizar");
  }
};

module.exports = {
  getClientMyProfile,
  postClientMyProfile,
};
