const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

async function gerarQRCode(url, nomeArquivo, pastaDestino = "public/qrcodes") {
  try {
    const caminhoPasta = path.join(__dirname, "..", pastaDestino);

    if (!fs.existsSync(caminhoPasta)) {
      fs.mkdirSync(caminhoPasta, { recursive: true });
    }

    const caminhoCompleto = path.join(caminhoPasta, `${nomeArquivo}.png`);

    await QRCode.toFile(caminhoCompleto, url, {
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    return `/qrcodes/${nomeArquivo}.png`;
  } catch (err) {
    console.error("Erro ao gerar QR Code:", err);
    throw err;
  }
}

module.exports = gerarQRCode;
