import { Router } from "express";
import {
  createContactUs,
  getContactsUs,
} from "../controllers/contactUs/contactUs.controller.js";

const router = Router();

router.route("/").post(createContactUs);
router.route("/").get(getContactsUs);

export default router;
