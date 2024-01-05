import { Router } from "express";
import { TaxCsvFileUpload } from "../controllers/product/tax.controller.js";

import { uploadCSVFile } from "../middlewares/uploadCSVFile.js";
const router = Router();

router
  .route("/csv-file-upload")
  .post(uploadCSVFile.single("csvFile"), TaxCsvFileUpload);

export default router;
