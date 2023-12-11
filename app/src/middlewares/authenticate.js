import jwt from "jsonwebtoken"

import { ApiError } from "../../utils/ApiError.js";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ApiError(401,'Unauthorized user!')
  }
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401,'Unauthorized user!')
  }
};