// server/controllers/my-companies.js

const getMyProfileMyCompanies = async (req, res) => {
  try {
    res.render("my-profile-my-companies");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getMyProfileMyCompanies };
