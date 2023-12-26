import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers["Authorization"] || req.cookies["cookie_token"];

    if (!token) {
      throw new ApiError(401, "Token not found");
    }

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const existedUser = await User.findOne({ email: user.email });

    if (!existedUser) {
      throw new ApiError(404, "User Not Found!");
    }

    if (existedUser.role !== "user") {
      return res.status(401).json({ error: "Not permissions" });
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { userAuth };
