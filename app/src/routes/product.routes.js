import { Router } from "express";
import {
  createProductData,
  createCategory,
} from "../controllers/product/product.controller.js";
import { imageUpload } from "../middlewares/imageUpload.js";
import { videoUpload } from "../middlewares/videoUpload.js";

const router = Router();

router
  .route("/create-product")
  .post(imageUpload.array("images", 5), createProductData);

router.route("/create-category").post(createCategory);

export default router;
//videoUpload.single("video")
