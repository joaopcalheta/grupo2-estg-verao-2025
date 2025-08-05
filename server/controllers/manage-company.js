// ../controllers/manage-company.js

const Company = require("../models/company");

// GET: Mostrar formulário com dados atuais
const getEditCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findOne({
      _id: companyId,
      user_id: req.user._id, // Garante que o user só edita empresas dele
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
    const { name, phone, nif, address, postcode, municipality, about_us, pic } =
      req.body;

    const company = await Company.findOneAndUpdate(
      {
        _id: companyId,
        user_id: req.user._id, // Evita que outro user edite
      },
      {
        name,
        phone,
        nif,
        address,
        postcode,
        municipality,
        about_us,
        pic,
      },
      { new: true }
    );

    if (!company) {
      return res.status(404).send("Empresa não encontrada");
    }

    res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacaoEditCompany', 'true');
        window.location.href = '/settings?section=my-companies';
      </script>
    `);
  } catch (err) {
    console.error("Erro ao editar empresa:", err);
    res.status(500).send("Erro ao editar empresa");
  }
};

module.exports = {
  getEditCompany,
  postEditCompany,
};
