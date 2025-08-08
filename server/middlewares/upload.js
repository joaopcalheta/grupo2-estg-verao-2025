const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});

function fileFilter(req, file, cb) {
  const ok = /jpeg|jpg|png|gif|webp/.test(path.extname(file.originalname).toLowerCase());
  if (!ok) return cb(new Error('Apenas imagens (jpg, png, gif, webp).'));
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 } // 3MB
});

module.exports = upload;