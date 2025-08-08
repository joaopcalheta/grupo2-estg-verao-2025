// ../js/settings/settings-menu.js

/**
 * Função para carregar o conteúdo da secção escolhida no menu
 * Faz uma requisição fetch para o endpoint `/settings/{section}` e insere o HTML recebido dentro do container com id "section-container" no settings.ejs
 *
 * @param {String} section - Nome da secção a carregar
 */
function loadSection(section) {
  fetch(`/${section}`)
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao carregar a secção.");
      return res.text();
    })
    .then((html) => {
      document.getElementById("section-container").innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("section-container").innerHTML =
        "<p>Erro ao carregar conteúdo.</p>";
    });
}

/**
 * Carrega a secção "my-account" por padrão se não tiver nenhuma secção selecionada no url
 */
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");

  if (section) {
    loadSection(section);
  } else {
    loadSection("my-account"); // secção por defeito
  }
});

// --------- para o scroll horizontal do menu ---------

const slider = document.getElementById("menu-container");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("dragging");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("dragging");
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("dragging");
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1;
  slider.scrollLeft = scrollLeft - walk;
});

// para mobile
let touchStartX = 0;
let touchScrollLeft = 0;

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].pageX - slider.offsetLeft;
  touchScrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - touchStartX) * 1;
  slider.scrollLeft = touchScrollLeft - walk;
});

// --------- para o scroll horizontal do menu ---------

//----------background do botão selecionado-------------
const menuItems = document.querySelectorAll("#menu-container > div");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove a classe 'selected' de todos
    menuItems.forEach((i) => i.classList.remove("selected"));
    // Adiciona a classe 'selected' no item clicado
    item.classList.add("selected");
  });
});
// quando vamos para as settings, "Minha conta" fica selecionado por default
if (menuItems.length > 0) {
  menuItems[0].classList.add("selected");
}
