const getLogin = async (req, res) => {
  try {
    res.render("login", {
      title: "",
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getLogin };
