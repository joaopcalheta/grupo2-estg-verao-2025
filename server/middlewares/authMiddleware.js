function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error", "Para aceder a esta página, é necessário fazer login. ");
  res.redirect("/login");
}

module.exports = { ensureAuthenticated };
