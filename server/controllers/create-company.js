// ../controllers/create-company.js

const Company = require("../models/company");
const User = require("../models/user");
const path = require("path");

const getCreateCompany = async (req, res) => {
  try {
    res.render("create-company", {});
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postCreateCompany = async (req, res) => {
  try {
    const {
      name,
      extra_admins,
      company_email,
      phone,
      nif,
      address,
      postcode,
      municipality,
      about_us,
      pic,
    } = req.body;

    // usernames do criador e dos administradores adicionais
    const currentUsername = req.user.username;
    const extraAdminUsernames = (extra_admins || "")
      .split(",")
      .map((name) => name.trim().toLowerCase())
      .filter((name) => name && name !== currentUsername);

    // verifica se osusernames adicionis sao validos
    const validUsers = await User.find({
      username: { $in: extraAdminUsernames },
    })
      .select("username")
      .lean();
    const validUsernames = validUsers.map((u) => u.username);

    // junta o username do criador com o dos administradores adicionais
    const allAdmins = [...new Set([currentUsername, ...validUsernames])];

    const uploadedPath = req.file ? `/uploads/${req.file.filename}` : null;
    const finalPic = uploadedPath || "";

    const newCompany = new Company({
      name,
      admin_usernames: allAdmins,
      company_email,
      phone,
      nif,
      address,
      postcode,
      municipality,
      about_us,
      pic: finalPic,
      //user_id,
    });

    await newCompany.save();
    res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacaoCreateCompany', 'true');
        window.location.href = '/settings?section=my-companies';
      </script>
    `);
  } catch (err) {
    console.error("Erro ao criar empresa: ", err);
    res.status(500).send("Erro ao criar anúncio");
  }
};

module.exports = { getCreateCompany, postCreateCompany };
