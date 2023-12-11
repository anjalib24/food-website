import { Router } from "express";
import {
  product,
  category,
} from "../controllers/product/product.controller.js";
import { imageUpload } from "../middlewares/imageUpload.js";
import { videoUpload } from "../middlewares/videoUpload.js";

const router = Router();

router.route("/create-product").post(imageUpload.array("images", 5), product);

router.route("/create-category").post(category);

export default router;
