const getCreateCompany = async (req, res) => {
  try {
    res.render("create-company", {
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno no servidor");
  }
};

module.exports = { getCreateCompany };