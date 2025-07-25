document.addEventListener("DOMContentLoaded", function() {
  mostrarAnuncios();
});

function mostrarAnuncios() {
  const anuncios = JSON.parse(localStorage.getItem('anuncios')) || [];
  const container = document.getElementById('meusAnuncios');
  container.innerHTML = '';

  anuncios.forEach((anuncio, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${anuncio.foto || '/images/anuncio1.jpg'}" alt="foto anúncio" class="thumbnail">
      <h3>${anuncio.profissao}</h3>
      <p>${anuncio.local}</p>
      <p>${anuncio.regime}</p>
      <button class="btn btn-blue mb-2" onclick="verCandidatos(${index})">Ver candidatos</button>
      <button class="btn btn-black" onclick="gerirAnuncio(${index})">Gerir</button>
    `;
    container.appendChild(card);
  });
}

function gerirAnuncio(index) {
  localStorage.setItem('editIndex', index);
  location.href = '/company-manage-announcement';
}

function verCandidatos(index) {
  location.href = '/company-candidates';
}