import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { stripeCheckOutPayment } from "../../utils/stipe.js";
import { User } from "../../models/user.model.js";

const productPaymentWithStripe = asyncHandler(async (req, res) => {
  const { customerEmail, productName, productPrice } = req.body;

  if (!customerEmail && !productName && !productPrice) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email: customerEmail });

  if (!existedUser) {
    throw new ApiError(409, "User not found!");
  }

  const stipePaymentData = await stripeCheckOutPayment(
    existedUser.name,
    customerEmail,
    productName,
    productPrice
  );

  return res
    .status(201)
    .json(new ApiResponse(200, stipePaymentData, "Stipe Process successfully"));
});

export { productPaymentWithStripe };
