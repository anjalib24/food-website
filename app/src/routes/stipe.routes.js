import { Router } from "express";
import { productPaymentWithStripe } from "../controllers/stripePayment/payment.controller.js";

const router = Router();

router.route("/create-checkout-session").post(productPaymentWithStripe);

export default router;
