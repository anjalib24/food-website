import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getCurrentUser,
  updateUser,
  logoutUser,
  userOrderHistory,
} from "../controllers/user/user.controller.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = Router();

router.route("/get-current").get(userAuth, getCurrentUser);
router.route("/get-users").get(getAllUsers);
router.route("/register").post(registerUser);
router.route("/update-user/:id").put(userAuth, updateUser);
router.route("/login").post(loginUser);
router.route("/logout").get(userAuth, logoutUser);
router.route("/get-user-order-history").get(userAuth, userOrderHistory);

export default router;
