import { Router } from "express";

import { uploadCSVFile } from "../middlewares/uploadCSVFile.js";
import {
  dimensionCsvFileUpload,
  dimensionWeightRangeCsvFileUpload,
  getDimension,
  getDimensionWeightRange,
} from "../controllers/product/dimensions.controller.js";
const router = Router();

router
  .route("/csv-file-upload")
  .post(uploadCSVFile.single("csvFile"), dimensionCsvFileUpload);

router
  .route("/csv-file-upload/dimension-weight-range")
  .post(uploadCSVFile.single("csvFile"), dimensionWeightRangeCsvFileUpload);

router.route("/get-product-dimension").get(getDimension);
router
  .route("/get-product-weight-range-dimension")
  .get(getDimensionWeightRange);

export default router;
