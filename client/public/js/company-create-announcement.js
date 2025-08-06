const freguesiasPorConcelho = {
  "Ponta do Sol": ["Ponta do Sol", "Canhas", "Madalena do Mar"],
  Calheta: [
    "Calheta",
    "Arco da Calheta",
    "Estreito da Calheta",
    "Fajã da Ovelha",
    "Jardim do Mar",
    "Paúl do Mar",
    "Ponta do Pargo",
    "Prazeres",
  ],
  "Ribeira Brava": ["Ribeira Brava", "Campanário", "Serra de Água", "Tabua"],
  "Câmara de Lobos": [
    "Câmara de Lobos",
    "Estreito de Câmara de Lobos",
    "Jardim da Serra",
    "Quinta Grande",
  ],
  Funchal: [
    "Imaculado Coração de Maria",
    "Monte",
    "Santa Luzia",
    "Santa Maria Maior",
    "Santo António",
    "São Gonçalo",
    "São Martinho",
    "São Pedro",
    "São Roque",
    "Sé",
  ],
  "Santa Cruz": [
    "Santa Cruz",
    "Camacha",
    "Caniço",
    "Gaula",
    "Santo António da Serra (Santa Cruz)",
  ],
  Machico: [
    "Machico",
    "Água de Pena",
    "Caniçal",
    "Porto da Cruz",
    "Santo António da Serra (Machico)",
  ],
  Santana: [
    "Santana",
    "Arco de São Jorge",
    "Faial",
    "Ilha",
    "São Jorge",
    "São Roque do Faial",
  ],
  "São Vicente": ["São Vicente", "Boaventura"],
  "Porto Moniz": [
    "Porto Moniz",
    "Achadas da Cruz",
    "Ribeira da Janela",
    "Seixal",
  ],
  "Porto Santo": ["Porto Santo"],
};

document.addEventListener("DOMContentLoaded", function () {
  const municipioSelect = document.getElementById("municipality");
  const freguesiaSelect = document.getElementById("freguesia");

  municipioSelect.addEventListener("change", function () {
    const concelho = this.value;
    const freguesias = freguesiasPorConcelho[concelho] || [];

    // Limpa as opções atuais
    freguesiaSelect.innerHTML = "";

    if (freguesias.length === 0) {
      freguesiaSelect.disabled = true;
      const opt = document.createElement("option");
      opt.text = "Sem freguesias disponíveis";
      opt.disabled = true;
      opt.selected = true;
      freguesiaSelect.add(opt);
    } else {
      freguesiaSelect.disabled = false;
      const placeholder = document.createElement("option");
      placeholder.text = "Selecione uma freguesia";
      placeholder.disabled = true;
      placeholder.selected = true;
      freguesiaSelect.add(placeholder);

      freguesias.forEach(function (freg) {
        const option = document.createElement("option");
        option.value = freg;
        option.text = freg;
        freguesiaSelect.add(option);
      });
    }
  });
});
