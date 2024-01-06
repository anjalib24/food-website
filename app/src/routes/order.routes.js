import { Router } from "express";
import {
  orderProductPaymentWithStripe,
  orderSuccess,
  stripeWebHookHandler,
} from "../controllers/order/order.controller.js";

const router = Router();
import { userAuth } from "../middlewares/userAuth.js";

router.route("/create-order/:id").post(userAuth, orderProductPaymentWithStripe);
router.route("/success").get(orderSuccess);
// router.route("/stripe-webhook").post(stripeWebHookHandler);

export default router;
