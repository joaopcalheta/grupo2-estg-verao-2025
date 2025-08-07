//clicar para chegar ao meu perfil~(empresa)
function myCompanyProfile() {
  location.href = "/apagar_company-my-profile";
}
//clicar para chegar aos meus anuncios(empresa)
function myAdd() {
  location.href = "/company-my-announcements";
}

//--------------ALERTAS------------------
// Verifica se há notificação a ser exibida
if (sessionStorage.getItem("mostrarNotificacao") === "true") {
  const notification = document.getElementById("notification");
  notification.style.display = "flex";

  // Remove o gatilho da sessão para não repetir
  sessionStorage.removeItem("mostrarNotificacao");

  // Reinicia a animação da progress bar
  const progressBar = notification.querySelector(".progress-bar-add");
  progressBar.style.animation = "none";
  progressBar.offsetHeight; // forçar reflow
  progressBar.style.animation = null;

  // Desaparece após x segundos
  setTimeout(() => {
    notification.classList.add("hide");
    setTimeout(() => {
      notification.remove();
    }, 50);
  }, 5000);
}

// Verifica se há notificação de remoção a ser exibida
if (sessionStorage.getItem("mostrarNotificacaoRemocao") === "true") {
  const notificationDelete = document.getElementById("notification-delete");
  notificationDelete.style.display = "flex";

  // Remove o gatilho da sessão para não repetir
  sessionStorage.removeItem("mostrarNotificacaoRemocao");

  // Reinicia a animação da progress bar
  const progressBar = notificationDelete.querySelector(".progress-bar-del");
  progressBar.style.animation = "none";
  progressBar.offsetHeight; // forçar reflow
  progressBar.style.animation = null;

  // Esconde após x segundos
  setTimeout(() => {
    notificationDelete.classList.add("hide");
    setTimeout(() => {
      notificationDelete.remove();
    }, 50); // tempo da transição de opacidade
  }, 5000); // tempo do alerta
}

// Verifica se há notificação de remoção a ser exibida
if (sessionStorage.getItem("mostrarNotificacaoEdit") === "true") {
  const notificationEdit = document.getElementById("notification-edit");
  notificationEdit.style.display = "flex";

  // Remove o gatilho da sessão para não repetir
  sessionStorage.removeItem("mostrarNotificacaoEdit");

  // Reinicia a animação da progress bar
  const progressBar = notificationEdit.querySelector(".progress-bar-edit");
  progressBar.style.animation = "none";
  progressBar.offsetHeight; // forçar reflow
  progressBar.style.animation = null;

  // Esconde após x segundos
  setTimeout(() => {
    notificationEdit.classList.add("hide");
    setTimeout(() => {
      notificationEdit.remove();
    }, 50);
  }, 5000);
}
