// server/controllers/my-companies.js

const getMyCompanies = async (req, res) => {
  try {
    res.render("my-companies");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getMyCompanies };
