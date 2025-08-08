// server/controllers/home.js

const { Cursor } = require("mongoose");
const Announcement = require("../models/announcement");

const expireAnnouncements = require("../utils/expireAnnouncements");

const getHome = async (req, res) => {
  try {
    await expireAnnouncements(); // Expira anúncios antes de carregar a página inicial - verifica se data de fim ja passou e altera o estado para "Expirado"

    const order = req.query.order || "recent";

    const page = parseInt(req.query.page) || 1; // Página atual
    const limit = 10; // Número de anúncios por página
    const skip = (page -1) * limit;
    
    const { category, type, regime, municipality, education_level } = req.query;

    let sortOptions = {};
    let useCollation = false;

    switch (order) {
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      case "featured":
        sortOptions = { isFeatured: -1, createdAt: -1 };
        break;
      case "a-z":
        sortOptions = { job_name: 1 };
        useCollation = true;
        break;
      case "z-a":
        sortOptions = { job_name: -1 };
        useCollation = true;
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const filter = { state: "Ativo" };

    if (category) {
      filter.category = {
        $in: Array.isArray(category) ? category : [category],
      };
    }
    if (type) {
      filter.type = { $in: Array.isArray(type) ? type : [type] };
    }
    if (regime) {
      filter.regime = { $in: Array.isArray(regime) ? regime : [regime] };
    }
    if (municipality) {
      filter.municipality = {
        $in: Array.isArray(municipality) ? municipality : [municipality],
      };
    }
    if (education_level) {
      filter.education_level = {
        $in: Array.isArray(education_level)
          ? education_level
          : [education_level],
      };
    }

    let query = Announcement.find(filter).sort(sortOptions).skip(skip).limit(limit);

    if (useCollation) {
      query = query.collation({ locale: "pt", strength: 1 });
    }

    const [announcements, total] = await Promise.all([
      query.exec(),
      Announcement.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.render("home", {
      announcements,
      order,
      query: req.query,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar página inicial");
  }
};

module.exports = { getHome };
