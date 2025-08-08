document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput"); // Local de pesquisa
  const searchBtn = document.getElementById("searchBtn"); // botão da lupa
  const jobCards = document.querySelectorAll(".job-card"); // anúncios

  function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase();

    jobCards.forEach((card) => {
      const title =
        card.querySelector(".job-title")?.textContent.toLowerCase() || "";
      const category =
        card.querySelector(".job-category")?.textContent.toLowerCase() || "";
      const location =
        card.querySelector(".job-location")?.textContent.toLowerCase() || "";
      const type =
        card.querySelector(".job-type")?.textContent.toLowerCase() || "";
      // add mais se quisermos que apareça quando pesquisamos
      const combined = `${title} ${category} ${location} ${type}`;
      card.style.display = combined.includes(searchTerm) ? "block" : "none";
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
