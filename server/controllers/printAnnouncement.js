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
        justify-content: space-between;
        border-bottom: 3px solid #007acc;
        padding-bottom: 10px;
        margin-bottom: 25px;
      }

      .logo-title {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .company-logo {
        max-height: 60px;
      }

      .job-title {
        font-size: 26px;
        font-weight: bold;
        color: #007acc;
        margin: 0;
      }

      .announcement-image {
        width: 100%;
        max-height: 180px;
        object-fit: cover;
        border-radius: 6px;
        margin-bottom: 25px;
      }

      .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px 40px;
        margin-bottom: 25px;
      }

      .info-grid h5 {
        margin: 0;
        font-size: 14px;
      }

      .label {
        font-weight: bold;
        color: #444;
      }

      .description-section {
        margin-bottom: 30px;
      }

      .description-box {
        background: #f3f3f3;
        border-left: 4px solid #007acc;
        padding: 12px;
        border-radius: 6px;
        font-size: 14px;
        white-space: pre-line;
      }

      .footer {
        text-align: center;
        font-size: 12px;
        color: #777;
        border-top: 1px solid #ddd;
        padding-top: 15px;
        margin-top: 30px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="logo-title">
          <img src="/images/logo.jpg" alt="Logo da empresa" class="company-logo" />
          <h1 class="job-title">aaa</h1>
        </div>
      </div>

      <!-- Announcement Image -->
      <img src="/images/anuncio.jpg" alt="Imagem do anúncio" class="announcement-image" />

      <!-- Info Section -->
      <div class="info-grid">
        <h5><span class="label">Local:</span> Calheta</h5>
        <h5><span class="label">Freguesia:</span> Calheta</h5>
        <h5><span class="label">Morada:</span> RUa</h5>
        <h5><span class="label">Código Postal:</span> 0000-000</h5>
        <h5><span class="label">Regime:</span> Full-Time</h5>
        <h5><span class="label">Categoria:</span> Restauração</h5>
        <h5><span class="label">Tipo:</span> Emprego</h5>
        <h5><span class="label">Escolaridade:</span> ensino básico</h5>
        <h5><span class="label">Línguas:</span> Eng</h5>
        <h5><span class="label">Horário:</span> 11:11 - 22:22</h5>
        <h5><span class="label">Salário:</span> 123€</h5>
        <h5><span class="label">Estado:</span> Ativo</h5>
        <h5><span class="label">Fim do anúncio:</span> 30/08/2025</h5>
        <h5><span class="label">Vagas:</span> 1</h5>
        <h5><span class="label">Candidaturas recebidas:</span> 0</h5>
      </div>

      <!-- Descrição -->
      <div class="description-section">
        <h5><span class="label">Descrição da vaga:</span></h5>
        <div class="description-box">
          dadad
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        Gerado automaticamente por iEmpregos • ${new Date().toLocaleDateString(
          "pt-PT"
        )}<br />
        Este é um documento informativo. Para candidatar-se, visite a plataforma.
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
