const getSearchFilter = async (req, res) => {
  try {
    res.render("search-filter", {
      title: "",
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getSearchFilter };
