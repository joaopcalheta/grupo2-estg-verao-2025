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

//----------seleciona a aba correta-------------//

/**
 * Inicializa o menu de definições
 */
function initializeSettingsPage() {
  const menuItems = document.querySelectorAll("#menu-container > div");

  // Limpa as classes
  menuItems.forEach((item) => item.classList.remove("selected"));

  // Seleciona "Minha conta"
  menuItems.forEach((item) => {
    if (item.textContent.trim() === "Minha conta") {
      item.classList.add("selected");
    }
  });

  // Carrega secção "Minha conta"
  loadSection("my-account");

  // Limpa localStorage para forçar reset
  localStorage.removeItem("activeTab");
  localStorage.removeItem("activeSection");

  // Adiciona listeners de clique nas abas
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((i) => i.classList.remove("selected"));
      item.classList.add("selected");

      const sectionName = item
        .getAttribute("onclick")
        .match(/loadSection\('(.+)'\)/)[1];

      loadSection(sectionName);

      // (Opcional: guardar aba clicada)
      localStorage.setItem("activeTab", item.textContent.trim());
      localStorage.setItem("activeSection", sectionName);
    });
  });
}

// Pageshow para cobrir o f5 + botão "voltar"
window.addEventListener("pageshow", initializeSettingsPage);

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
