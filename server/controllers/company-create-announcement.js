const gerarQRCode = require("../utils/qrGenerator");
const Announcement = require("../models/announcement");
const path = require("path");
const expireAnnouncements = require("../utils/expireAnnouncements");

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
    await expireAnnouncements(); // Expira anúncios antigos
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

    console.log("Dados recebidos do front end:", req.body);

    const uploadedPath = req.file ? `/uploads/${req.file.filename}` : null;
    const picPath =
      uploadedPath ||
      categoryToImage[category] ||
      "/css/images/defaults/default.png";

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
      qrcode_pic: null, // fica nulo até gerar o QR Code
    });

    // controi o url do anuncio e mete numa variavel
    const urlAnuncio = `${req.protocol}://${req.get(
      "host"
    )}/home-details-announcement?id=${newAnnouncement._id}`;

    // pega nesse url e gera o qr code
    // e guarda o caminho do qr code na variavel caminhoQRCode
    const caminhoQRCode = await gerarQRCode(
      urlAnuncio,
      `anuncio_${newAnnouncement._id}`
    );

    // guarda na base de dados esse link, no qrcode_pic, que ate agora estava null
    newAnnouncement.qrcode_pic = caminhoQRCode;

    await newAnnouncement.save();

    res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacao', 'true');
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
