const getHome = async (req, res) => {
  try {
    res.render("home", {
      title: "",
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getHome };
