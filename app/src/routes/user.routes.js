import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/user/user.controller.js";

const router = Router();

router.route("/get-users").get(getAllUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
