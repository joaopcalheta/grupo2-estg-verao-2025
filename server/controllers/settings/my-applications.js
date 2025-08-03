// ../controllers/settings/my-applications.js

const getMyApplicationsPage = async (req, res) => {
  try {
    res.render("partials/settings/my-applications", {
      layout: false, // desativa layout do express-ejs-layout (header,head e footer) porque é inserida via ajax na settings.ejs
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getMyApplicationsPage };
