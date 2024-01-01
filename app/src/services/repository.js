import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { FreeZipCode } from "../models/freeZipCode.model.js";
import { Benchmark } from "../models/benchmark.model.js";
import { FixedShippingPrice } from "../models/fixedShippingPrice.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getShippoData } from "../utils/shippo.js";

export const cartRepository = async (userId) => {
  const carts = await Cart.find({ user_id: userId }).populate({
    path: "items",
  });

  return carts[0];
};
export const addItem = async (payload) => {
  const newItem = await Cart.create(payload);
  return newItem;
};

export const addShippingCharge = async (cartData) => {
  try {
    if (cartData.items?.length > 0) {
      const fixedShippingPrice = await FixedShippingPrice.findOne();
      const userDetails = await User.findById(cartData.user_id);

      const freeZipCodeData = await FreeZipCode.find();
      const benchmarkData = await Benchmark.findOne();

      const matchingFreeZipCode = freeZipCodeData.find(
        (freeZipCode) => freeZipCode.zipCode === userDetails.zipcode
      );

      if (
        matchingFreeZipCode &&
        userDetails.zipcode === matchingFreeZipCode.zipCode &&
        benchmarkData &&
        benchmarkData.benchmark1 < cartData.subTotal
      ) {
        return cartData;
      } else if (
        matchingFreeZipCode &&
        userDetails.zipcode === matchingFreeZipCode.zipCode &&
        benchmarkData &&
        benchmarkData.benchmark1 > cartData.subTotal
      ) {
        cartData.shippingCharge = fixedShippingPrice.fixed_shipping_price;
        cartData.subTotal += fixedShippingPrice.fixed_shipping_price;

        return cartData.save();
      } else if (
        !matchingFreeZipCode &&
        benchmarkData &&
        benchmarkData.benchmark < cartData.subTotal
      ) {
        return cartData;
      } else if (
        !matchingFreeZipCode &&
        benchmarkData &&
        benchmarkData.benchmark > cartData.subTotal
      ) {
        // there is need to implement shippo
        // getShippoData
        return cartData;
      }
    }
    return cartData;
  } catch (error) {
    console.error("Error in addShippingCharge:", error);
    throw new ApiError(500, `Error adding shipping charge: ${error.message}`);
  }
};
