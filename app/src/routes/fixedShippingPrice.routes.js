import { Router } from "express";
import {
  createFixedShippingPrice,
  getAllFixedShippingPrices,
  getOneFixedShippingPrice,
  updateFixedShippingPrice,
  deleteFixedShippingPrice,
} from "../controllers/product/fixedShippingPrice.controller.js";

const router = Router();

router.route("/").post(createFixedShippingPrice).get(getAllFixedShippingPrices);

router
  .route("/:id")
  .get(getOneFixedShippingPrice)
  .put(updateFixedShippingPrice)
  .delete(deleteFixedShippingPrice);

export default router;
