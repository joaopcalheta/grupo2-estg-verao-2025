const getFilter = async (req, res) => {
  try {
    res.render("filter", {
      title: "",
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getFilter };
