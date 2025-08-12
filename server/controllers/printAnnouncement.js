const puppeteer = require("puppeteer");
const Announcement = require("../models/announcement");
const Company = require("../models/company");

async function printAnnouncementPdf(req, res) {
  try {
    const id = req.params.id;

    // Buscar o anúncio
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).send("Anúncio não encontrado.");
    }

    // Buscar a empresa associada
    if (!announcement.company_id) {
      return res
        .status(400)
        .send("Este anúncio não tem uma empresa associada.");
    }

    const company = await Company.findById(announcement.company_id);
    if (!company) {
      return res.status(404).send("Empresa associada não encontrada.");
    }

    // HTML completo com dados do anúncio e da empresa
    const html = `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <style>
    @page {
      size: A4;
      margin: 2cm;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #fff;
      color: #333;
      margin: 0;
    }

    .container {
      width: 100%;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 15px;
      border-bottom: 3px solid #007acc;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }

    .job-title {
      font-size: 28px;
      font-weight: bold;
      color: #007acc;
      margin: 0;
    }

    .main-content {
      display: flex;
      gap: 30px;
      margin-bottom: 30px;
    }

    .announcement-image {
      flex-shrink: 0;
      width: 35%;
      max-width: 180px;
      height: auto;
      border-radius: 6px;
      object-fit: contain;
      box-shadow: 0 0 8px rgba(0,0,0,0.1);
    }

    .info-grid {
      flex-grow: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px 30px;
      font-size: 14px;
    }

    .info-grid h5 {
      margin: 0;
      line-height: 1.3;
    }

    .label {
      font-weight: 600;
      color: #444;
    }

    .description-section {
      margin-bottom: 30px;
    }

    .description-box {
      background: #f3f3f3;
      border-left: 4px solid #007acc;
      padding: 14px;
      border-radius: 6px;
      font-size: 14px;
      white-space: pre-line;
      line-height: 1.4;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #777;
      border-top: 1px solid #ddd;
      padding-top: 15px;
      margin-top: 40px;
      position: relative;
    }

    .qr-code {
      margin-top: 20px;
      text-align: center;
    }

    .qr-code img {
      max-width: 120px;
      height: auto;
    }

    @media (max-width: 600px) {
      .main-content {
        flex-direction: column;
      }

      .announcement-image {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>

<body>
  <div class="container">

    <!-- Título do Anúncio -->
    <div class="header">
      <h1 class="job-title">${announcement.job_name}</h1>
    </div>

    <!-- Anúncio: Imagem + Dados -->
    <div class="main-content">
      <img src="http://localhost:3000${
        announcement.pic
      }" alt="Imagem do anúncio" class="announcement-image" />

      <div class="info-grid">
        <h5><span class="label">Local:</span> ${announcement.municipality}, ${
      announcement.freg || "Freguesia não especificada"
    }</h5>
        <h5><span class="label">Morada:</span> ${
          announcement.address || "Não especificada"
        }</h5>
        <h5><span class="label">Código Postal:</span> ${
          announcement.postcode || "Não especificado"
        }</h5>
        <h5><span class="label">Regime:</span> ${
          announcement.regime || "Não especificado"
        }</h5>
        <h5><span class="label">Categoria:</span> ${announcement.category}</h5>
        <h5><span class="label">Tipo:</span> ${announcement.type}</h5>
        <h5><span class="label">Escolaridade:</span> ${
          announcement.education_level || "Não especificada"
        }</h5>
        <h5><span class="label">Línguas:</span> ${
          announcement.languages && announcement.languages.length > 0
            ? announcement.languages.join(" ; ")
            : "Não especificado"
        }</h5>
        <h5><span class="label">Horário:</span> ${
          announcement.schedule?.startTime || "?"
        } - ${announcement.schedule?.endTime || "?"}</h5>
        <h5><span class="label">Salário:</span> ${
          announcement.salary ? announcement.salary + "€" : "A combinar"
        }</h5>
        <h5><span class="label">Número de vagas:</span> ${
          announcement.numberOfPositions
        }</h5>
        <h5><span class="label">Número de candidaturas:</span> ${
          announcement.numberOfApplications || 0
        }</h5>
        <h5><span class="label">Fim do anúncio:</span> ${
          announcement.end_date
            ? new Date(announcement.end_date).toLocaleDateString("pt-PT")
            : "Indefinido"
        }</h5>
      </div>
    </div>

    <!-- Descrição do Anúncio -->
    <div class="description-section">
      <h5><span class="label">Descrição:</span></h5>
      <div class="description-box">
        ${announcement.description}
      </div>
    </div>

    <!-- Dados da Empresa -->
    <div class="header">
      <h1 class="job-title">${company.name}</h1>
    </div>

    <div class="main-content">
      <img src="http://localhost:3000${
        company.pic
      }" alt="Logo da empresa" class="announcement-image" />
      <div class="info-grid">
        <h5><span class="label">Telefone:</span> ${company.phone}</h5>
        <h5><span class="label">Morada:</span> ${company.address}</h5>
        <h5><span class="label">Código Postal:</span> ${company.postcode}</h5>
        <h5><span class="label">Município:</span> ${company.municipality}</h5>
      </div>
    </div>

    <!-- Sobre a Empresa -->
    ${
      company.about_us?.trim()
        ? `
        <div class="description-section">
          <h5><span class="label">Sobre a empresa:</span></h5>
          <div class="description-box">
            ${company.about_us}
          </div>
        </div>`
        : ""
    }

    <!-- Rodapé com QR Code -->
    <div class="footer">
      Gerado automaticamente por iEmpregos • ${new Date().toLocaleDateString(
        "pt-PT"
      )}<br />
      Este é um documento informativo. Para candidatar-se, visite a plataforma usando o código QR.

      <div class="qr-code">
        <img src="http://localhost:3000${
          announcement.qrcode_pic
        }" alt="QR do Anúncio" />
      </div>
    </div>

  </div>
</body>
</html>
`;

    // Launch Puppeteer and generate PDF buffer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    });

    await browser.close();

    // Envia o PDF para o cliente abrir no navegador
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="anuncio-${id}.pdf"`,
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao gerar o PDF.");
  }
}

module.exports = { printAnnouncementPdf };
