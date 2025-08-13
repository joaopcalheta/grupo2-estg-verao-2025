//-----------Botão flutuante para voltar ao topo da página--------
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnTop");

  window.onscroll = function () {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  window.scrollToTop = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
});
