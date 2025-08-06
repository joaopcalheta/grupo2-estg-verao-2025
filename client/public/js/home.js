document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput"); // Local de pesquisa
  const searchBtn = document.getElementById("searchBtn"); // botão da lupa
  const jobCards = document.querySelectorAll(".job-card"); // anúncios

  function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase();

    jobCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(searchTerm) ? "block" : "none";
    });
  }

  // Ativar ao escrever
  searchInput.addEventListener("input", filterJobs);

  // Ativar ao clicar no botão
  if (searchBtn) {
    searchBtn.addEventListener("click", filterJobs);
  }

  // Ativar ao carregar Enter
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      filterJobs();
    }
  });
});

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
    }, 500);
  }, 5000);
}
