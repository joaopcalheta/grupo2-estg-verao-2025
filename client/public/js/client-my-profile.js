//clicar para chegar ao meu perfil
function clientProfile() {
  location.href = "/client-my-profile";
}
//clicar para chegar as candidaturas
function clientCand() {
  location.href = "/client-my-applications";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profile-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.value.trim(),
      username: form.username.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      nif: form.nif.value.trim(),
    };

    try {
      const res = await fetch("/client-my-profile/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Erro a guardar: " + (data.error || "Desconhecido"));
        return;
      }

      alert("Perfil guardado com sucesso!");
    } catch (err) {
      console.error("Falha na submissão:", err);
      alert("Erro de rede. Tenta novamente.");
    }
  });
});
