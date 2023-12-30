import { Router } from "express";
import {
  createFreeZipCode,
  getAllFreeZipCodes,
  getOneFreeZipCode,
  updateFreeZipCode,
  deleteFreeZipCode,
} from "../controllers/product/freeZipCode.controller.js";

const router = Router();

router.route("/").post(createFreeZipCode).get(getAllFreeZipCodes);

router
  .route("/:id")
  .get(getOneFreeZipCode)
  .put(updateFreeZipCode)
  .delete(deleteFreeZipCode);

export default router;
