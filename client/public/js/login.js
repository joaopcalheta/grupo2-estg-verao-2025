const btnLogin = document.getElementById("btn-login");
const btnRegister = document.getElementById("btn-register");
const slider = document.getElementById("slider");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

btnLogin.addEventListener("click", () => {
  slider.style.left = "0%";

  btnLogin.classList.add("active");
  btnRegister.classList.remove("active");

  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

btnRegister.addEventListener("click", () => {
  slider.style.left = "50%";

  btnLogin.classList.remove("active");
  btnRegister.classList.add("active");

  loginForm.classList.remove("active");
  registerForm.classList.add("active");

  // Mostrar apenas campos de candidato ao mudar para registo
  btnCandidato.checked = true;
  candidatoFields.style.display = "none";
  empresaFields.style.display = "block";
});

const radioCandidato = document.getElementById("btn-candidato");
const radioEmpresa = document.getElementById("btn-empresa");

const camposCandidato = document.querySelector(".candidato-f");
const camposEmpresa = document.querySelector(".empresa-f");

function mostrarCampos(tipo) {
  if (tipo === "candidato") {
    camposCandidato.style.display = "block";
    camposEmpresa.style.display = "none";
  } else if (tipo === "empresa") {
    camposCandidato.style.display = "none";
    camposEmpresa.style.display = "block";
  }
}

// Evento para cada rádio
radioCandidato.addEventListener("change", () => {
  mostrarCampos("candidato");
});

radioEmpresa.addEventListener("change", () => {
  mostrarCampos("empresa");
});

// Garantir que ao entrar na aba "Registar", o default é "Candidato"
mostrarCampos("candidato");
