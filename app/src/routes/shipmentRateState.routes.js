import { Router } from "express";

import { uploadCSVFile } from "../middlewares/uploadCSVFile.js";
import { shipmentRateStateCsvFileUpload } from "../controllers/product/shipmentRateState.controller.js";
const router = Router();

router
  .route("/csv-file-upload")
  .post(uploadCSVFile.single("csvFile"), shipmentRateStateCsvFileUpload);

export default router;
