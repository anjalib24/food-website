import { Router } from "express";
import {
  createCredential,
  getAllCredentials,
  updateCredential,
} from "../controllers/user/credentials.controller.js";

const router = Router();

router
  .route("/")
  .post(createCredential)
  .get(getAllCredentials)
  .put(updateCredential);

export default router;
