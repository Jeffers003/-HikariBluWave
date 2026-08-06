import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname);

    cb(null, Date.now() + extensao);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const tipos = /jpg|jpeg|png|webp/;

    const valido =
      tipos.test(path.extname(file.originalname).toLowerCase()) &&
      tipos.test(file.mimetype);

    if (valido) {
      return cb(null, true);
    }

    cb(new Error("Apenas imagens são permitidas."));
  },
});

export default upload;
