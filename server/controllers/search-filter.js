// server/controllers/searchFilterController.js

const getSearchFilter = async (req, res) => {
  try {
    res.render("search-filter", {
      query: req.query,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getSearchFilter };
