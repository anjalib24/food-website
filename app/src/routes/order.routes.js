import { Router } from "express";
import {
  orderProductPaymentWithStripe,
  orderSuccess,
  stripeWebHookHandler,
} from "../controllers/order/order.controller.js";

const router = Router();

router.route("/create-order/:id").post(orderProductPaymentWithStripe);
router.route("/success").get(orderSuccess);
// router.route("/stripe-webhook").post(stripeWebHookHandler);

export default router;
