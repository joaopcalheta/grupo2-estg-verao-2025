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
        <style>
          body { font-family: Arial, sans-serif; margin: 2cm; }
          h1 { color: #333; }
          h5 { margin-bottom: 0.5em; }
          span { font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>${announcement.job_name}</h1>
        <h5><span>Local:</span> ${announcement.municipality}</h5>
        <h5><span>Regime:</span> ${announcement.regime}</h5>
        <h5><span>Categoria:</span> ${announcement.category}</h5>
        <h5><span>Tipo:</span> ${announcement.type}</h5>
        <h5><span>Escolaridade:</span> ${announcement.education_level}</h5>
        <h5><span>Línguas:</span> ${
          announcement.languages && announcement.languages.length > 0
            ? announcement.languages.join(" ; ")
            : "Não especificado"
        }</h5>
        <h5><span>Horário:</span> ${announcement.schedule.startTime} - ${
      announcement.schedule.endTime
    }</h5>
        <h5><span>Salário:</span> ${
          announcement.salary ? announcement.salary + "€" : "A combinar"
        }</h5>
        <h5><span>Fim do anúncio:</span> ${
          announcement.end_date
            ? new Date(announcement.end_date).toLocaleDateString("pt-PT")
            : "Indefinido"
        }</h5>
        <h5><span>Número de vagas:</span> ${announcement.numberOfPositions}</h5>
        <h5><span>Número de candidaturas:</span> ${
          announcement.numberOfApplications || 0
        }</h5>
        <h5><span>Descrição:</span><br/>${announcement.description}</h5>
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
