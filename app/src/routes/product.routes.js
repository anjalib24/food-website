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
  getAllCategory,
  createCountry,
  getAllCountry,
} from "../controllers/product/product.controller.js";
import { upload } from "../middlewares/uploadMediaFile.js";

const router = Router();

router.route("/get-product").get(getProductData);

router.route("/create-product").post(
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  createProductData
);

router.route("/update-product/:id").put(updateProductData);

router.route("/delete-product/:id").delete(deleteProductData);

router.route("/create-category").post(createCategory);

router.route("/get-all-category").get(getAllCategory);

router.route("/add-to-cart").post(addItemToCart);

router.route("/get-cart").get(getCart);

router.route("/remove-items-from-cart").get(emptyCart);

router.route("/create-country").post(createCountry);

router.route("/get-all-country").get(getAllCountry);

export default router;
