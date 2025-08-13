// ../controllers/company-manage-announcement.js

const Announcement = require("../models/announcement");
const expireAnnouncements = require("../utils/expireAnnouncements");
const Application = require("../models/application");
const path = require("path");
const fs = require("fs");

const getCompanyManageAnnouncement = async (req, res) => {
  try {
    await expireAnnouncements(); // Expira anúncios antes de carregar a página - verifica se data de fim ja passou e altera o estado para "Expirado"
    const announcementId = req.params.announcementID;
    if (!announcementId) {
      return res.status(400).send("ID do anúncio não foi fornecido");
    }

    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      return res.status(404).send("Anúncio não foi encontrado");
    }

    const now = new Date();
    console.log("Data atual:", now);

    res.render("company-manage-announcement", {
      announcement,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

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

const updateCompanyAnnouncement = async (req, res) => {
  try {
    const announcementId = req.params.announcementID;
    if (!announcementId)
      return res.status(400).send("ID do anúncio não foi fornecido");

    const current = await Announcement.findById(announcementId);
    if (!current) return res.status(404).send("Anúncio não foi encontrado");

    const {
      job_name,
      category,
      type,
      municipality,
      freg,
      address,
      postcode,
      regime,
      education_level,
      salary,
      end_date,
      numberOfPositions,
      description,
      state,
      "schedule[startTime]": startTime,
      "schedule[endTime]": endTime,
    } = req.body;

    const updateData = {
      job_name,
      category,
      type,
      municipality,
      freg,
      address,
      postcode,
      regime,
      education_level,
      salary,
      end_date,
      numberOfPositions,
      description,
      state,
      schedule: { startTime, endTime },
    };

    if (req.file) {
      const newPath = `/uploads/${req.file.filename}`;

      try {
        if (current.pic && current.pic.startsWith("/uploads/")) {
          const absOld = path.join(__dirname, "..", current.pic);
          fs.unlink(absOld, () => {});
        }
      } catch (e) {
        console.warn("Falha ao remover imagem antiga:", e.message);
      }

      updateData.pic = newPath;
    }

    // se a categoria mudou e a imagem atual é um default antigo, pode atualizar para o novo default
    else if (category && category !== current.category) {
      updateData.pic = categoryToImage[category] || current.pic;
    }

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      announcementId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAnnouncement)
      return res.status(404).send("Anúncio não foi encontrado");

    const companyID = updatedAnnouncement.company_id;

    return res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacaoEdit', 'true');
        window.location.href = '/company-my-announcements/${companyID}';
      </script>
    `);
  } catch (err) {
    console.error("Erro ao atualizar anúncio:", err);
    res.status(500).send("Erro interno no servidor");
  }
};

const deleteCompanyAnnouncement = async (req, res) => {
  try {
    const announcementId = req.params.announcementID;
    if (!announcementId) {
      return res.status(400).send("ID do anúncio não foi fornecido");
    }

    // vou buscar primeiro o anúncio para sacar o company_id
    const announcement = await Announcement.findById(announcementId);

    // pa verificar se foi bem sacado
    if (!announcement) {
      return res.status(404).send("Anúncio não foi encontrado");
    }
    const companyID = announcement.company_id;
    const tempCompanyID = companyID;

    // apagar as candidaturas associadas ao anúncio
    await Application.deleteMany({ announcement_id: announcementId });

    // apagar o anúncio
    await Announcement.findByIdAndDelete(announcementId);

    return res.send(`
      <script>
        sessionStorage.setItem('mostrarNotificacaoRemocao', 'true');
        window.location.href = '/company-my-announcements/${tempCompanyID}';
      </script>
    `);
  } catch (err) {
    console.error("Erro ao apagar anúncio:", err);
    return res.status(500).send("Erro interno no servidor");
  }
};

module.exports = {
  getCompanyManageAnnouncement,
  updateCompanyAnnouncement,
  deleteCompanyAnnouncement,
};
