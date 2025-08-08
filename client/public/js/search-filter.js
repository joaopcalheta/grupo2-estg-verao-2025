document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-option");

  buttons.forEach((button) => {
    const targetId = button.getAttribute("data-bs-target")?.replace("#", "");
    const target = document.getElementById(targetId);
    const icon = button.querySelector(".rotate-icon");

    if (!target || !icon) return;

    target.addEventListener("show.bs.collapse", () => {
      icon.classList.add("rotated");
      button.classList.add("active-bold");
    });

    target.addEventListener("hide.bs.collapse", () => {
      icon.classList.remove("rotated");
      button.classList.remove("active-bold");
    });

    // Definir o estado inicial
    if (target.classList.contains("show")) {
      icon.classList.add("rotated");
      button.classList.add("active-bold");
    }
  });
});
