// ../controllers/company-manage-announcement.js

const Announcement = require("../models/announcement");

const getCompanyManageAnnouncement = async (req, res) => {
  try {
    const announcementId = req.params.announcementID;
    if (!announcementId) {
      return res.status(400).send("ID do anúncio não foi fornecido");
    }

    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      return res.status(404).send("Anúncio não foi encontrado");
    }

    res.render("company-manage-announcement", {
      announcement,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

const updateCompanyAnnouncement = async (req, res) => {
  try {
    const announcementId = req.params.announcementID;
    if (!announcementId) {
      return res.status(400).send("ID do anúncio não foi fornecido");
    }

    const updateData = req.body;

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      announcementId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).send("Anúncio não foi encontrado");
    }

    // Sacar o company_id a partir do anúncio atualizado
    const companyID = updatedAnnouncement.company_id;

    // ✅ Retorna um sucesso simples
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

    // apagar o anúncio
    await Announcement.findByIdAndDelete(announcementId);

    // ✅ Retorna um sucesso simples
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
