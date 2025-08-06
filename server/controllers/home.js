// server/controllers/homeController.js

const Announcement = require("../models/announcement");

const getHome = async (req, res) => {
  try {
    const order = req.query.order || "recent";
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

    const filter = {};

    if (category) {
      filter.category = { $in: Array.isArray(category) ? category : [category] };
    }
    if (type) {
      filter.type = { $in: Array.isArray(type) ? type : [type] };
    }
    if (regime) {
      filter.regime = { $in: Array.isArray(regime) ? regime : [regime] };
    }
    if (municipality) {
      filter.municipality = { $in: Array.isArray(municipality) ? municipality : [municipality] };
    }
    if (education_level) {
      filter.education_level = {
        $in: Array.isArray(education_level) ? education_level : [education_level],
      };
    }

    let query = Announcement.find(filter);

    if (useCollation) {
      query = query.collation({ locale: "pt", strength: 1 });
    }

    const announcements = await query.sort(sortOptions);

    res.render("home", {
      announcements,
      order,
      query: req.query,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar página inicial");
  }
};

module.exports = { getHome };
