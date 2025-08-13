// NOTIFICAÇÕES DE settings-menu

if (sessionStorage.getItem("mostrarNotificacaoPerfilAtt") === "true") {
  const notificationPerfilAtt = document.getElementById(
    "notification-perfil-att"
  );
  notificationPerfilAtt.style.display = "flex";

  sessionStorage.removeItem("mostrarNotificacaoPerfilAtt");

  const progressBar = notificationPerfilAtt.querySelector(
    ".progress-bar-perfil-att"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight;
  progressBar.style.animation = null;

  setTimeout(() => {
    notificationPerfilAtt.classList.add("hide");
    setTimeout(() => {
      notificationPerfilAtt.remove();
    }, 50);
  }, 5000);
}

if (sessionStorage.getItem("mostrarNotificacaoCreateCompany") === "true") {
  const notificationCreateCompany = document.getElementById(
    "notification-create-company"
  );
  notificationCreateCompany.style.display = "flex";

  sessionStorage.removeItem("mostrarNotificacaoCreateCompany");

  const progressBar = notificationCreateCompany.querySelector(
    ".progress-bar-create-company"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight;
  progressBar.style.animation = null;

  setTimeout(() => {
    notificationCreateCompany.classList.add("hide");
    setTimeout(() => {
      notificationCreateCompany.remove();
    }, 50);
  }, 5000);
}

if (sessionStorage.getItem("mostrarNotificacaoManageCompany") === "true") {
  const notificationManageCompany = document.getElementById(
    "notification-manage-company"
  );
  notificationManageCompany.style.display = "flex";

  sessionStorage.removeItem("mostrarNotificacaoManageCompany");

  const progressBar = notificationManageCompany.querySelector(
    ".progress-bar-manage-company"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight;
  progressBar.style.animation = null;

  setTimeout(() => {
    notificationManageCompany.classList.add("hide");
    setTimeout(() => {
      notificationManageCompany.remove();
    }, 50);
  }, 5000);
}

if (sessionStorage.getItem("mostrarNotificacaoDeleteCompany") === "true") {
  const notificationDeleteCompany = document.getElementById(
    "notification-delete-company"
  );
  notificationDeleteCompany.style.display = "flex";

  sessionStorage.removeItem("mostrarNotificacaoDeleteCompany");

  const progressBar = notificationDeleteCompany.querySelector(
    ".progress-bar-delete-company"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight;
  progressBar.style.animation = null;

  setTimeout(() => {
    notificationDeleteCompany.classList.add("hide");
    setTimeout(() => {
      notificationDeleteCompany.remove();
    }, 50);
  }, 5000);
}

// NOTIFICAÇÕES DE company-my-announcements----------------------------

if (sessionStorage.getItem("mostrarNotificacao") === "true") {
  const notification = document.getElementById("notification");
  notification.style.display = "flex";

  sessionStorage.removeItem("mostrarNotificacao");

  const progressBar = notification.querySelector(".progress-bar-add");
  progressBar.style.animation = "none";
  progressBar.offsetHeight;
  progressBar.style.animation = null;

  setTimeout(() => {
    notification.classList.add("hide");
    setTimeout(() => {
      notification.remove();
    }, 50);
  }, 5000);
}

if (sessionStorage.getItem("mostrarNotificacaoRemocao") === "true") {
  const notificationDelete = document.getElementById("notification-delete");
  notificationDelete.style.display = "flex";

  sessionStorage.removeItem("mostrarNotificacaoRemocao");

  const progressBar = notificationDelete.querySelector(".progress-bar-del");
  progressBar.style.animation = "none";
  progressBar.offsetHeight;
  progressBar.style.animation = null;

  setTimeout(() => {
    notificationDelete.classList.add("hide");
    setTimeout(() => {
      notificationDelete.remove();
    }, 50);
  }, 5000);
}

if (sessionStorage.getItem("mostrarNotificacaoEdit") === "true") {
  const notificationEdit = document.getElementById("notification-edit");
  notificationEdit.style.display = "flex";

  sessionStorage.removeItem("mostrarNotificacaoEdit");

  const progressBar = notificationEdit.querySelector(".progress-bar-edit");
  progressBar.style.animation = "none";
  progressBar.offsetHeight;
  progressBar.style.animation = null;

  setTimeout(() => {
    notificationEdit.classList.add("hide");
    setTimeout(() => {
      notificationEdit.remove();
    }, 50);
  }, 5000);
}

// NOTIFICAÇÕES DE home------------------------------------

if (sessionStorage.getItem("mostrarNotificacaoCandEnv") === "true") {
  const notificationCandEnv = document.getElementById("notification-cand-env");
  notificationCandEnv.style.display = "flex";

  sessionStorage.removeItem("mostrarNotificacaoCandEnv");

  const progressBar = notificationCandEnv.querySelector(
    ".progress-bar-cand-env"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight;
  progressBar.style.animation = null;

  setTimeout(() => {
    notificationCandEnv.classList.add("hide");
    setTimeout(() => {
      notificationCandEnv.remove();
    }, 50);
  }, 5000);
}

// NOTIFICAÇÕES DE my-applications------------------------------------

if (sessionStorage.getItem("mostrarNotificacaoDelCand") === "true") {
  const notificationDelCand = document.getElementById("notification-del-cand");
  notificationDelCand.style.display = "flex";

  sessionStorage.removeItem("mostrarNotificacaoDelCand");

  const progressBar = notificationDelCand.querySelector(
    ".progress-bar-del-cand"
  );
  progressBar.style.animation = "none";
  progressBar.offsetHeight;
  progressBar.style.animation = null;

  setTimeout(() => {
    notificationDelCand.classList.add("hide");
    setTimeout(() => {
      notificationDelCand.remove();
    }, 50);
  }, 5000);
}
