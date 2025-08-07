function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }  
  
  // Se não estiver autenticado, redireciona para a página de login
  req.flash("error", "Para aceder a esta página, é necessário fazer login. ");
  res.redirect("/login");
}

module.exports = { ensureAuthenticated };
