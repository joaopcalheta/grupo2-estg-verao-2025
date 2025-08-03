// ../controllers/settings.js

const getSettingsPage = (req, res) => {
  try {
    res.render("settings");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getSettingsPage };
