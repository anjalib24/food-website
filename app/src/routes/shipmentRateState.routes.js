import { Router } from "express";

import { uploadCSVFile } from "../middlewares/uploadCSVFile.js";
import {
  shipmentRateStateCsvFileUpload,
  getShipmentRateState,
} from "../controllers/product/shipmentRateState.controller.js";
const router = Router();

router
  .route("/csv-file-upload")
  .post(uploadCSVFile.single("csvFile"), shipmentRateStateCsvFileUpload);

router.route("/get-shipment-rate-state").get(getShipmentRateState);

export default router;
