document.addEventListener("DOMContentLoaded", function() {
  criarAnuncio();
});

function criarAnuncio() {
  document.getElementById('createAnuncioForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const anuncio = {
    profissao: form.title.value,
    categoria: form.category.value,
    tipo: form.type.value,
    local: form.location.value,
    regime: form.regime.value,
    descricao: form.description.value,
    foto: ''  //foto ainda não funciona
  };

  const anuncios = JSON.parse(localStorage.getItem('anuncios')) || [];
  anuncios.push(anuncio);
  localStorage.setItem('anuncios', JSON.stringify(anuncios));

  alert('Anúncio criado com sucesso.');
    window.location.href = '/myAds';
  });
}