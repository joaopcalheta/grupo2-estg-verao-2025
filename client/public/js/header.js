//abre o sideMenu
function toggleMenu() {
  document.querySelector(".side-menu").classList.toggle("open");
  document.querySelector(".overlay").classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);

  sessionStorage.setItem("scrollTo", params.get("scroll"));
  const scrollToId = sessionStorage.getItem("scrollTo");

  if (scrollToId) {
    const target = document.getElementById(scrollToId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    sessionStorage.removeItem("scrollTo");
  }
});
