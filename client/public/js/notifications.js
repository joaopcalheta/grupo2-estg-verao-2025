// NOTIFICAÇÕES DE settings-menu

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

// NOTIFICAÇÕES DE company-my-announcements----------------------------

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

// NOTIFICAÇÕES DE home------------------------------------

// Verifica se há notificação a ser exibida
if (sessionStorage.getItem("mostrarNotificacaoCandEnv") === "true") {
  const notificationCandEnv = document.getElementById("notification-cand-env");
  notificationCandEnv.style.display = "flex";

  // Remove o gatilho da sessão para não repetir
  sessionStorage.removeItem("mostrarNotificacaoCandEnv");

  // Reinicia a animação da progress bar (necessário para casos de reuso)
  const progressBar = notificationCandEnv.querySelector(
    ".progress-bar-cand-env"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight; // forçar reflow
  progressBar.style.animation = null;

  // Esconde após x segundos
  setTimeout(() => {
    notificationCandEnv.classList.add("hide");
    setTimeout(() => {
      notificationCandEnv.remove();
    }, 50);
  }, 5000);
}

// NOTIFICAÇÕES DE my-applications------------------------------------

// Verifica se há notificação de remoção a ser exibida
if (sessionStorage.getItem("mostrarNotificacaoDelCand") === "true") {
  const notificationDelCand = document.getElementById("notification-del-cand");
  notificationDelCand.style.display = "flex";

  // Remove o gatilho da sessão para não repetir
  sessionStorage.removeItem("mostrarNotificacaoDelCand");

  // Reinicia a animação da progress bar
  const progressBar = notificationDelCand.querySelector(
    ".progress-bar-del-cand"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight; // forçar reflow
  progressBar.style.animation = null;

  // Esconde após x segundos
  setTimeout(() => {
    notificationDelCand.classList.add("hide");
    setTimeout(() => {
      notificationDelCand.remove();
    }, 50); // tempo da transição de opacidade
  }, 5000); // tempo do alerta
}
