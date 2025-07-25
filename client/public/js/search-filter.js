// search-filter.js

document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll(".dropdown-btn");

  dropdownButtons.forEach(button => {
    button.addEventListener("click", () => {

      button.classList.toggle("active");

      // Inverter icons ▾ / ▴
      if (button.textContent.includes("▾")) {
        button.textContent = button.textContent.replace("▾", "▴");
      } else if (button.textContent.includes("▴")) {
        button.textContent = button.textContent.replace("▴", "▾");
      }

      const next = button.nextElementSibling;
      if (next && next.classList.contains("checkbox-group")) {
        next.style.display = next.style.display === "block" ? "none" : "block";
      }
    });
  });

  // Fecha o painel (simulado)
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    document.querySelector(".filtro-container").style.display = "none";
  });
});
