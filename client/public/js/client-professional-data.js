document.getElementById("professional-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  // recolher as línguas que foram escolhidas
  const languages = Array.from(
    form.querySelectorAll('input[name="languages[]"]:checked')
  ).map((el) => el.value);

  const payload = {
    languages,
    education_level: form.escolaridade ? form.escolaridade.value : "",
    skills: form.querySelector('input[placeholder="Competências"]')?.value || "",
    about_me: form.querySelector('input[placeholder="Sobre mim"]')?.value || "",
  };

  try {
    const res = await fetch("/routes/clientProfessionalDataRoute", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Dados profissionais guardados!");
    } else {
      const err = await res.json();
      alert("Erro: " + (err.error || "Desconhecido"));
    }
  } catch (err) {
    console.error(err);
    alert("Erro de rede ao guardar os dados profissionais.");
  }
});