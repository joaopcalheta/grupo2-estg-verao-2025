const puppeteer = require("puppeteer");
const Announcement = require("../models/announcement");

async function printAnnouncementPdf(req, res) {
  try {
    const id = req.params.id;

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).send("Anúncio não encontrado.");
    }

    // Montar o HTML com os dados do anúncio (pode usar template string)
    const html = `
      <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 2cm;
        background-color: #f9f9f9;
        color: #333;
      }

      .container {
        background: #fff;
        padding: 2em;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0,0,0,0.1);
      }

      .header {
        display: flex;
        align-items: center;
        margin-bottom: 2em;
      }

      .header img {
        max-height: 100px;
        margin-right: 1.5em;
        border-radius: 10px;
        object-fit: cover;
      }

      h1 {
        margin: 0;
        font-size: 2em;
        color: #2c3e50;
      }

      h5 {
        margin: 0.3em 0;
        font-size: 1em;
      }

      span.label {
        font-weight: bold;
        color: #555;
      }

      .section {
        margin-bottom: 1.5em;
      }

      .description {
        margin-top: 1em;
        background: #f1f1f1;
        padding: 1em;
        border-left: 4px solid #3498db;
        border-radius: 5px;
      }

      .footer {
        margin-top: 3em;
        font-size: 0.9em;
        color: #888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        ${
          announcement.pic
            ? `<img src="${announcement.pic}" alt="Imagem do anúncio">`
            : ""
        }
        <h1>${announcement.job_name}</h1>
      </div>

      <div class="section">
        <h5><span class="label">Local:</span> ${announcement.municipality}, ${
      announcement.freg || "Freguesia não especificada"
    }</h5>
        <h5><span class="label">Morada:</span> ${
          announcement.address || "Não especificada"
        }</h5>
        <h5><span class="label">Código Postal:</span> ${
          announcement.postcode || "Não especificado"
        }</h5>
      </div>

      <div class="section">
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
      </div>

      <div class="section">
        <h5><span class="label">Fim do anúncio:</span> ${
          announcement.end_date
            ? new Date(announcement.end_date).toLocaleDateString("pt-PT")
            : "Indefinido"
        }</h5>
        <h5><span class="label">Número de vagas:</span> ${
          announcement.numberOfPositions
        }</h5>
        <h5><span class="label">Número de candidaturas:</span> ${
          announcement.numberOfApplications || 0
        }</h5>
      </div>

      <div class="section">
        <h5><span class="label">Descrição:</span></h5>
        <div class="description">
          ${announcement.description}
        </div>
      </div>

      <div class="footer">
        Gerado automaticamente por iEmpregos • ${new Date().toLocaleDateString(
          "pt-PT"
        )}
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
