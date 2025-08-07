// ../controllers/manage-company.js

const Company = require("../models/company");
const User = require("../models/user");

// GET: Mostrar formulário com dados atuais
const getEditCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findOne({
      _id: companyId,
      admin_usernames: req.user.username, // Garante que os admins editem / giram as empresas deles
    });

    if (!company) {
      return res.status(404).send("Empresa não encontrada");
    }

    res.render("manage-company", { company });
  } catch (err) {
    console.error("Erro ao encontrar empresa para edição:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

// POST: Atualizar empresa
const postEditCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const {
      name,
      admin_usernames,
      phone,
      nif,
      address,
      postcode,
      municipality,
      about_us,
      pic,
    } = req.body;

    const currentUsername = req.user.username;
    const submittedUsernames = (admin_usernames || "")
      .split(",")
      .map((u) => u.trim().toLowerCase())
      .filter(Boolean);

    // Remove duplicados
    const uniqueUsernames = [...new Set(submittedUsernames)];

    // Impede remoção do único admin
    if (!uniqueUsernames.includes(currentUsername)) {
      return res
        .status(400)
        .send("Não pode remover-se a si próprio se for o único administrador.");
    }

    if (uniqueUsernames.length === 0) {
      return res.status(400).send("É necessário pelo menos um administrador.");
    }

    // Valida usernames
    const users = await User.find({
      username: { $in: uniqueUsernames },
    })
      .select("username")
      .lean();

    const validUsernames = users.map((u) => u.username);

    if (validUsernames.length !== uniqueUsernames.length) {
      return res.status(400).send("Alguns usernames são inválidos.");
    }

    const updatedCompany = await Company.findOneAndUpdate(
      { _id: companyId, admin_usernames: currentUsername },
      {
        name,
        phone,
        nif,
        address,
        postcode,
        municipality,
        about_us,
        pic,
        admin_usernames: validUsernames,
      },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).send("Empresa não encontrada");
    }

    res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacaoManageCompany', 'true');
        window.location.href = '/settings?section=my-companies';
      </script>
    `);
  } catch (err) {
    console.error("Erro ao editar empresa:", err);
    res.status(500).send("Erro ao editar empresa");
  }
};

const deleteCompany = async (req, res) => {
  console.log("Deleting Company...", req.query);
  try {
    const companyId = req.query.id;
    if (!companyId) {
      return res.status(400).send("ID da empresa não foi fornecido");
    }

    const deletedCompany = await Company.findByIdAndDelete(companyId);

    if (!deletedCompany) {
      return res.status(404).send("Empresa não foi encontrada");
    }

    // ✅ Retorna um sucesso simples
    return res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacaoDeleteCompany', 'true');
        window.location.href = '/settings?section=my-companies';
      </script>
    `);
  } catch (err) {
    console.error("Erro ao excluir empresa:", err);
    return res.status(500).send("Erro interno no servidor");
  }
};

module.exports = {
  getEditCompany,
  postEditCompany,
  deleteCompany,
};
