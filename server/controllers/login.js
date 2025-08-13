// controllers/loginController.js
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const getLogin = function (req, res) {
  res.render("login");
};

const postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/", // página após login bem-sucedido
    failureRedirect: "/login", // página em caso de erro
    failureFlash: true,
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Sessão terminada com sucesso.");
    res.redirect("/login");
  });
};

const register = async (req, res) => {
  const { name, username, email, password, confirmpassword } = req.body;

  if (!name || !username || !email || !password || !confirmpassword) {
    req.flash("error", "Todos os campos são obrigatórios.");
    return res.redirect("/login");
  }

  if (password !== confirmpassword) {
    req.flash("error", "As passwords não coincidem.");
    return res.redirect("/login");
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      req.flash("error", "Email ou username já estão em uso.");
      return res.redirect("/login");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    req.flash("success", "Registo efetuado com sucesso! Faça login.");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    req.flash("error", "Erro ao registar. Tente novamente.");
    res.redirect("/login");
  }
};

module.exports = { getLogin, postLogin, logout, register };
