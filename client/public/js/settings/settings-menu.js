// ../js/settings/settings-menu.js

/**
 * Função para carregar o conteúdo da secção escolhida no menu
 * Faz uma requisição fetch para o endpoint `/settings/{section}` e insere o HTML recebido dentro do container com id "section-container" no settings.ejs
 *
 * @param {String} section - Nome da secção a carregar
 */
function loadSection(section) {
  fetch(`/${section}`)
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao carregar a secção.");
      return res.text();
    })
    .then((html) => {
      document.getElementById("section-container").innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("section-container").innerHTML =
        "<p>Erro ao carregar conteúdo.</p>";
    });
}

/**
 * Carrega a secção "my-account" por padrão se não tiver nenhuma secção selecionada no url
 */
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");

  if (section) {
    loadSection(section);
  } else {
    loadSection("my-account"); // secção por defeito
  }
});

// --------- para o scroll horizontal do menu ---------

const slider = document.getElementById("menu-container");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("dragging");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("dragging");
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("dragging");
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1;
  slider.scrollLeft = scrollLeft - walk;
});

// para mobile
let touchStartX = 0;
let touchScrollLeft = 0;

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].pageX - slider.offsetLeft;
  touchScrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - touchStartX) * 1;
  slider.scrollLeft = touchScrollLeft - walk;
});

// --------- para o scroll horizontal do menu ---------

// --------- NOTIFICAÇÕES ---------

// Verifica se há notificação de remoção a ser exibida
if (sessionStorage.getItem("mostrarNotificacaoPerfilAtt") === "true") {
  const notificationPerfilAtt = document.getElementById(
    "notification-perfil-att"
  );
  notificationPerfilAtt.style.display = "flex";

  // Remove o gatilho da sessão para não repetir
  sessionStorage.removeItem("mostrarNotificacaoPerfilAtt");

  // Reinicia a animação da progress bar (necessário para casos de reuso)
  const progressBar = notificationPerfilAtt.querySelector(
    ".progress-bar-perfil-att"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight; // forçar reflow
  progressBar.style.animation = null;

  // Esconde após x segundos
  setTimeout(() => {
    notificationPerfilAtt.classList.add("hide");
    setTimeout(() => {
      notificationPerfilAtt.remove();
    }, 50); // tempo da transição de opacidade
  }, 5000); // tempo do alerta
}

// Verifica se há notificação de remoção a ser exibida
if (sessionStorage.getItem("mostrarNotificacaoCreateCompany") === "true") {
  const notificationCreateCompany = document.getElementById(
    "notification-create-company"
  );
  notificationCreateCompany.style.display = "flex";

  // Remove o gatilho da sessão para não repetir
  sessionStorage.removeItem("mostrarNotificacaoCreateCompany");

  // Reinicia a animação da progress bar (necessário para casos de reuso)
  const progressBar = notificationCreateCompany.querySelector(
    ".progress-bar-create-company"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight; // forçar reflow
  progressBar.style.animation = null;

  // Esconde após x segundos
  setTimeout(() => {
    notificationCreateCompany.classList.add("hide");
    setTimeout(() => {
      notificationCreateCompany.remove();
    }, 50); // tempo da transição de opacidade
  }, 5000); // tempo do alerta
}

// Verifica se há notificação de remoção a ser exibida
if (sessionStorage.getItem("mostrarNotificacaoManageCompany") === "true") {
  const notificationManageCompany = document.getElementById(
    "notification-manage-company"
  );
  notificationManageCompany.style.display = "flex";

  // Remove o gatilho da sessão para não repetir
  sessionStorage.removeItem("mostrarNotificacaoManageCompany");

  // Reinicia a animação da progress bar (necessário para casos de reuso)
  const progressBar = notificationManageCompany.querySelector(
    ".progress-bar-manage-company"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight; // forçar reflow
  progressBar.style.animation = null;

  // Esconde após x segundos
  setTimeout(() => {
    notificationManageCompany.classList.add("hide");
    setTimeout(() => {
      notificationManageCompany.remove();
    }, 50); // tempo da transição de opacidade
  }, 5000); // tempo do alerta
}

// Verifica se há notificação de remoção a ser exibida
if (sessionStorage.getItem("mostrarNotificacaoDeleteCompany") === "true") {
  const notificationDeleteCompany = document.getElementById(
    "notification-delete-company"
  );
  notificationDeleteCompany.style.display = "flex";

  // Remove o gatilho da sessão para não repetir
  sessionStorage.removeItem("mostrarNotificacaoDeleteCompany");

  // Reinicia a animação da progress bar (necessário para casos de reuso)
  const progressBar = notificationDeleteCompany.querySelector(
    ".progress-bar-delete-company"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight; // forçar reflow
  progressBar.style.animation = null;

  // Esconde após x segundos
  setTimeout(() => {
    notificationDeleteCompany.classList.add("hide");
    setTimeout(() => {
      notificationDeleteCompany.remove();
    }, 50); // tempo da transição de opacidade
  }, 5000); // tempo do alerta
}
