document.addEventListener("click", (e) => {
  const container = e.target.closest("#pfp-container");
  if (!container) return;
  const input = document.querySelector("#uploadFoto");
  if (input) input.click();
});

document.addEventListener("change", (e) => {
  if (e.target && e.target.id === "uploadFoto") {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = document.querySelector("#pfpImg");
      if (img) img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
});
