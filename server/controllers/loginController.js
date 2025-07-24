const getLogin = function (req, res) {
  res.render("login", {
    title: "",
  });
};

module.exports = { getLogin };
