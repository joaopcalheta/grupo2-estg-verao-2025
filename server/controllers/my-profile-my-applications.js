const getMyProfileMyApplications = async (req, res) => {
  try {
    res.render("my-profile-my-applications", {
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getMyProfileMyApplications };