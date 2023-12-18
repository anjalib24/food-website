import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies["cookie_token"];

    if (!token) {
      throw new ApiError(401, "Token not found");
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const existedUser = await User.findOne({ email: user.email });

    if (!existedUser) {
      throw new ApiError(404, "User Not Found!");
    }

    if (existedUser.role !== "admin") {
      return res.status(401).json({ error: "Not permissions" });
    }

    next();
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { adminAuth };
