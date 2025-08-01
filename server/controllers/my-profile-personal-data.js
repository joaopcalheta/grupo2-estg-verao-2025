const User = require("../models/user");
const bcrypt = require("bcrypt");

const getMyProfilePersonalData = async (req, res) => {
  try {
    // req.user vem do passport
    res.render("my-profile-personal-data", {
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postUpdatePersonalData = async (req, res) => {
  try {

    if (!req.body) {
      console.error("REQ.BODY undefined. Headers:", req.headers);
      return res.status(400).send("Dados do formulário não foram recebidos.");
    }

    const {
      name,
      age,
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
        return res.status(400).send("É necessária a palavra-passe actual para alterar.");
      }
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return res.status(400).send("Palavra-passe actual incorreta.");
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Atualiza campos simples (poderias fazer checagens de unicidade para username/email)
    user.name = name || user.name;
    user.age = age || user.age;
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
        window.location.href = '/my-profile-personal-data';
      </script>
    `);
  } catch (err) {
    console.error("Erro ao atualizar perfil pessoal:", err);
    res.status(500).send("Erro ao atualizar perfil");
  }
};

module.exports = {
  getMyProfilePersonalData,
  postUpdatePersonalData,
};