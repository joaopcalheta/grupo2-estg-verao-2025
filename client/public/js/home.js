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
