document.addEventListener("DOMContentLoaded", function() {
    carregarDadosAnuncio();
    guardarAlteracoes();
    //eliminarAnuncio();
});

function carregarDadosAnuncio() {
  const anuncios = JSON.parse(localStorage.getItem('anuncios')) || [];
  const index = localStorage.getItem('editIndex');
  const anuncio = anuncios[index];

  // BUSCA OS DADOS INTRODUZIDOS QUANDO FOI CRIADO O ANUNCIO
  document.getElementById('job_name').value = anuncio.profissao || '';   //SE O VALOR ESTIVER UNDEFINED FICA VAZIO
  document.getElementById('category').value = anuncio.categoria || '';
  document.getElementById('type').value = anuncio.tipo || '';
  document.getElementById('municipality').value = anuncio.local || '';
  document.getElementById('regime').value = anuncio.regime || '';
  document.getElementById('description').value = anuncio.descricao || '';
  document.getElementById('currentPhoto').src = anuncio.foto || 'images/anuncio1.jpg';
};

// GUARDA AS ALTERAÇOES DO ANUNCIO CASO TENHA SIDO EDITADO
function guardarAlteracoes() {
  document.getElementById('editAnuncioForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const anuncios = JSON.parse(localStorage.getItem('anuncios')) || [];
  const index = localStorage.getItem('editIndex');

  //ATUALIZA OS DADOS DO ANÚNCIO
  const form = e.target;
  const updatedAnuncio = {
    profissao: form.title.value,
    categoria: form.category.value,
    tipo: form.type.value,
    local: form.location.value,
    regime: form.regime.value,
    descricao: form.description.value,
    foto: anuncios[index].foto
  };

  anuncios[index] = updatedAnuncio;

  localStorage.setItem('anuncios', JSON.stringify(anuncios));
  alert("Anúncio atualizado com sucesso.");
  window.location.href = "/company-my-announcements";
  });
}

