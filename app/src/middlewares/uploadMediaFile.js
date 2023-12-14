import multer from "multer";
import path from "path";

const allowedFileTypes = [".jpg", ".jpeg", ".png", ".mp4"];

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "images") {
      cb(null, path.join(__dirname, "../../public/images"));
    } else {
      cb(null, path.join(__dirname, "../../public/videos"));
    }
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
    cb(
      new Error("Invalid file type. Only jpg, jpeg, png and mp4 are allowed.")
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export { upload };
