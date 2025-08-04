// ../controllers/settings/my-account.js

const User = require("../../models/user");
const bcrypt = require("bcrypt");

const getMyAccountPage = async (req, res) => {
  try {
    // req.user vem do passport
    res.render("partials/settings/my-account", {
      user: req.user,
      layout: false, // desativa layout do express-ejs-layout (header,head e footer) porque é inserida via ajax na settings.ejs
    });
  } catch (err) {
    console.error(err);
  }
};

const postMyAccountData = async (req, res) => {
  try {
    if (!req.body) {
      console.error("REQ.BODY undefined. Headers:", req.headers);
      return res.status(400).send("Dados do formulário não foram recebidos.");
    }

    const {
      name,
      birthdate,
      username,
      phone,
      address,
      municipality,
      postcode,
      nif,
      email,
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("Utilizador não encontrado");

    // Se estiver a mudar password, verifica a actual
    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .send("É necessária a palavra-passe actual para alterar.");
      }
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return res.status(400).send("Palavra-passe actual incorreta.");
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Atualiza campos simples
    user.name = name || user.name;
    user.birthdate = birthdate || user.birthdate;
    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.municipality = municipality || user.municipality;
    user.postcode = postcode || user.postcode;
    user.nif = nif || user.nif;
    user.email = email || user.email;

    await user.save();
    return res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacaoPerfilAtt', 'true');
        window.location.href = '/settings?section=my-account';
      </script>
    `);
  } catch (err) {
    console.error("Erro ao atualizar perfil pessoal:", err);
    res.status(500).send("Erro ao atualizar perfil");
  }
};

module.exports = {
  getMyAccountPage,
  postMyAccountData,
};
