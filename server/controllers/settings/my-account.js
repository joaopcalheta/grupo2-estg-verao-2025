// ../controllers/settings/my-account.js

// modelos
const Company = require("../../models/company");
const Announcement = require("../../models/announcement");
const Application = require("../../models/application");
const ProfessionalProfile = require("../../models/professionalProfile");
const User = require("../../models/user");

//
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

    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
    }

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

    req.login(user, (err) => {
      if (err) {
        console.error("Erro ao reautenticar após update:", err);
      }
      return res.send(`
        <script>
          sessionStorage.setItem('mostrarNotificacaoPerfilAtt', 'true');
          // reload para que o header mostre o novo avatar
          window.location.href = '/settings?section=my-account';
        </script>
      `);
    });
  } catch (err) {
    console.error("Erro ao atualizar perfil pessoal:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const deleteMyAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const username = req.user.username;

    // Todas as empresas em que o utilizador é administrador
    const companies = await Company.find({ admin_usernames: username }).select(
      "_id"
    );
    const companyIds = companies.map((c) => c._id);

    if (companyIds.length > 0) {
      // Vai buscar todos os anúncios dessas empresas
      const announcements = await Announcement.find({
        company_id: { $in: companyIds },
      }).select("_id");
      const announcementIds = announcements.map((a) => a._id);

      // Apaga todas as candidaturas desses anúncios
      await Application.deleteMany({
        announcement_id: { $in: announcementIds },
      });

      // Apaga os anúncios
      await Announcement.deleteMany({ company_id: { $in: companyIds } });

      // Apaga as empresas
      await Company.deleteMany({ _id: { $in: companyIds } });
    }

    // Apaga as candidaturas feitas pelo proprio utilizador (como candidato)
    await Application.deleteMany({ user_id: userId });

    // Apaga o perfil profissional do utilizador
    await ProfessionalProfile.deleteOne({ user_id: userId });

    // Apaga o utilizador
    await User.findByIdAndDelete(userId);

    // Termina a sessão e manda pa página home
    req.logout((err) => {
      if (err) console.error("Erro ao terminar sessão após apagar conta:", err);
      return res.send(`
        <script>
          sessionStorage.setItem('mostrarNotificacaoContaApagada', 'true');
          window.location.href = '/';
        </script>
      `);
    });
  } catch (err) {
    console.error("Erro ao apagar conta:", err);
    return res.status(500).send("Erro interno no servidor");
  }
};

module.exports = {
  getMyAccountPage,
  postMyAccountData,
  deleteMyAccount,
};
