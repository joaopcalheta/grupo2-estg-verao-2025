
const bcrypt = require("bcrypt");
const User = require("../models/user");

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

const updatePersonalData = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      phone,
      nif,
      age,
      address,
      municipality,
      postcode,
    } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("Utilizador não encontrado");

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.nif = nif || user.nif;
    user.age = age || user.age;
    user.address = address || user.address;
    user.municipality = municipality || user.municipality;
    user.postcode = postcode || user.postcode;

    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    console.error("Erro ao atualizar dados pessoais:", err);
    res.status(500).send("Erro ao atualizar dados pessoais");
  }
};


const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send("Utilizador não encontrado");

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(400).json({ error: "Password atual incorreta" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: "Password alterada" });
  } catch (err) {
    console.error("Erro ao atualizar password:", err);
    res.status(500).send("Erro ao atualizar password");
  }
};

module.exports = {
  getMyProfilePersonalData,
  updatePersonalData,
  updatePassword,
};