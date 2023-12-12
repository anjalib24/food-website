import { Router } from "express";
import {
  createProductData,
  createCategory,
  getProductData,
  deleteProductData,
  updateProductData,
  addItemToCart,
  getCart,
  emptyCart,
} from "../controllers/product/product.controller.js";
import { imageUpload } from "../middlewares/imageUpload.js";
import { videoUpload } from "../middlewares/videoUpload.js";

const router = Router();

router.route("/get-product").get(getProductData);

router
  .route("/create-product")
  .post(imageUpload.array("images", 5), createProductData);

router.route("/update-product/:id").put(updateProductData);

router.route("/delete-product/:id").delete(deleteProductData);

router.route("/create-category").post(createCategory);

router.route("/add-to-cart").post(addItemToCart);

router.route("/get-cart").get(getCart);

router.route("/remove-items-from-cart").get(emptyCart);

export default router;
//videoUpload.single("video")
