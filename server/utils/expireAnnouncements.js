// ../utils/expireAnnouncements.js

const Announcement = require("../models/announcement");

const expireAnnouncements = async () => {
  try {
    const now = new Date();

    const result = await Announcement.updateMany(
      {
        end_date: { $lt: now },
        state: { $ne: "Expirado" },
      },
      { $set: { state: "Expirado" } }
    );

    if (result.modifiedCount > 0) {
      console.log(`Anúncios expirados atualizados: ${result.modifiedCount}`);
    }
  } catch (err) {
    console.error("Erro ao atualizar anúncios expirados:", err);
  }
};

module.exports = expireAnnouncements;
