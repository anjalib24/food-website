import multer from "multer";
import path from "path";

const allowedFileTypes = [".jpg", ".jpeg", ".png"];

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = function (req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only jpg, jpeg, and png are allowed."));
  }
};

const imageUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export { imageUpload };
