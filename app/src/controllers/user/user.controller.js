import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userRegistrationValidation } from "../../utils/Validation.js";

//User register part-
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body.userData;

  const { error } = userRegistrationValidation.validate(req.body.userData);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password and confirmation password do not match");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

// User login part-
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body.userData;

  if (!email && !password) {
    throw new ApiError(400, "Email and password fields are required!");
  }

  const existedUser = await User.findOne({ email });

  if (!existedUser) {
    throw new ApiError(404, "User Not Found!");
  } else if (await bcrypt.compare(password, existedUser.password)) {
    const tokenPayload = {
      _id: existedUser._id,
      email: existedUser.email,
    };

    const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET);

    res.status(201).json(new ApiResponse(200, accessToken, "User Logged In!"));
  } else {
    throw new ApiError(400, "Email and password fields are required!");
  }
});

export { registerUser, loginUser };
