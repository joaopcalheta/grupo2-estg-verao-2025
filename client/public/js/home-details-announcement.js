function toggleCompanyDetails() {
  const details = document.getElementById("company-details");
  const arrow = document.getElementById("company-arrow");
  const isHidden = details.style.display === "none";

  details.style.display = isHidden ? "block" : "none";
  arrow.className = isHidden ? "bi bi-chevron-up" : "bi bi-chevron-down";
}