// ../controllers/company-create-announcement.js

const Announcement = require("../models/announcement");
const path = require("path");

// Exemplo de mapeamento categoria -> imagem default
const categoryToImage = {
  Restauração: "/images/restauracao.jpg",
  Limpeza: "/images/limpeza.jpg",
  Construção: "/images/construcao.jpg",
  Vendedor: "/images/vendedor.jpg",
  Saúde: "/images/saude.jpg",
  Educação: "/images/educacao.jpg",
  IT: "/images/it.jpg",
  Administração: "/images/administracao.jpg",
  Transporte: "/images/transporte.jpg",
  "Atendimento ao Cliente": "/images/atendimento.jpg",
  Marketing: "/images/marketing.jpg",
  Financeiro: "/images/financeiro.jpg",
  Logística: "/images/logistica.jpg",
  Segurança: "/images/seguranca.jpg",
  "Serviços Gerais": "/images/servicos.jpg",
};

const getCompanyCreateAnnouncement = async (req, res) => {
  try {
    const companyID = req.params.companyID;
    res.render("company-create-announcement", { companyID });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

const postCompanyCreateAnnouncement = async (req, res) => {
  try {
    const {
      job_name,
      category,
      schedule,
      type,
      municipality,
      freg,
      address,
      postcode,
      regime,
      education_level,
      languages,
      salary,
      end_date,
      numberOfPositions,
      description,
      state,
    } = req.body;

    console.log("Dados recebidos:", req.body);

    // caminho final que será salvo no Mongo e usado no <img src="...">
    const uploadedPath = req.file ? `/uploads/${req.file.filename}` : null;

    const picPath =
      uploadedPath
      || (categoryToImage[req.body.category])
      || "/css/images/defaults/default.png";

    const newAnnouncement = new Announcement({
      job_name,
      category,
      type,
      municipality,
      freg,
      address,
      postcode,
      regime,
      education_level,
      schedule,
      languages,
      salary,
      end_date,
      numberOfPositions,
      description,
      pic: picPath,
      state,
      company_id: req.params.companyID,
      user_id: req.user._id,
    });

    await newAnnouncement.save();

    res.send(`
  <script>
  sessionStorage.setItem('mostrarNotificacao', 'true');
      // Redireciona para a página de destino
      window.location.href = '/company-my-announcements/${req.params.companyID}';
  </script>
`);
  } catch (err) {
    console.error("Erro ao criar anúncio:", err);
    res.status(500).send("Erro ao criar anúncio");
  }
};

module.exports = {
  getCompanyCreateAnnouncement,
  postCompanyCreateAnnouncement,
};
