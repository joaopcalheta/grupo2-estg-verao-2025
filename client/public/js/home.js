document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const jobCards = document.querySelectorAll(".job-card");

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
      const combined = `${title} ${category} ${location} ${type}`;
      card.style.display = combined.includes(searchTerm) ? "block" : "none";
    });
  }

  searchInput.addEventListener("input", filterJobs);

  if (searchBtn) {
    searchBtn.addEventListener("click", filterJobs);
  }

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      filterJobs();
    }
  });
});
