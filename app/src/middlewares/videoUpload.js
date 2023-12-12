import multer from "multer";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../../public/videos"));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// const fileFilter = function (req, file, cb) {
//   console.log("-----------------------------------------");
//   if (file.mimetype.startsWith("video/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only video files are allowed."));
//   }
// };

// const videoUpload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024,
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/videos"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const videoUpload = multer({ storage: storage });

export { videoUpload };
