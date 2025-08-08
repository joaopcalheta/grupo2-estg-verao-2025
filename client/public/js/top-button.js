//-----------Botão flutuante para voltar ao topo da página--------
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnTop");
  // Mostrar/ocultar o botão conforme o scroll
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

  // Função para voltar ao topo
  window.scrollToTop = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
});
