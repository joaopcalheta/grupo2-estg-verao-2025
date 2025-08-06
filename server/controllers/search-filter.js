// server/controllers/searchFilterController.js

const getSearchFilter = async (req, res) => {
  try {
    const normalizeToArray = (val) =>
      Array.isArray(val) ? val : val ? [val] : [];

    res.render("search-filter", {
      query: {
        ...req.query,
        category: normalizeToArray(req.query.category),
        type: normalizeToArray(req.query.type),
        regime: normalizeToArray(req.query.regime),
        municipality: normalizeToArray(req.query.municipality),
        education_level: normalizeToArray(req.query.education_level),
      },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getSearchFilter };
