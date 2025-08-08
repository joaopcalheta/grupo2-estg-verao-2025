//generatePdf.js
const puppeteer = require("puppeteer");

async function gerarPdf(conteudoHTML, caminhoArquivo = "relatorio.pdf") {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Define o conteúdo HTML
  await page.setContent(conteudoHTML, { waitUntil: "networkidle0" });

  // Gera o PDF
  await page.pdf({
    path: caminhoArquivo,
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();
  console.log(`✅ PDF gerado em: ${caminhoArquivo}`);
}

// Exporta a função para uso em outros arquivos
module.exports = gerarPdf;
