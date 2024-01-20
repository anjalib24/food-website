import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { FreeZipCode } from "../models/freeZipCode.model.js";
import { Benchmark } from "../models/benchmark.model.js";
import { FixedShippingPrice } from "../models/fixedShippingPrice.model.js";
import { ApiError } from "../utils/ApiError.js";
import ShipmentRateState from "../models/shipmentRateState.model.js";
import Dimension from "../models/Dimensions.model.js";
import DimensionWeightRange from "../models/dimensionWeightRange.model.js";
import ProductsReview from "../models/productsReviews.model.js";
import { Product } from "../models/product.model.js";

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

export const emptyCartAfterOrder = async (userID) => {
  let cart = await cartRepository(userID);
  cart.items = [];
  cart.subTotal = 0;
  cart.subTotalWeight = 0;
  cart.shippingCharge = 0;
  cart.tax = 0;

  return await cart.save();
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
        benchmarkData.benchmark2 < cartData.subTotal
      ) {
        if (cartData.shippingCharge > 0) {
          cartData.subTotal -= cartData.shippingCharge;
          cartData.shippingCharge = 0;

          return cartData.save();
        }
        return cartData;
      } else if (
        matchingFreeZipCode &&
        userDetails.zipcode === matchingFreeZipCode.zipCode &&
        benchmarkData &&
        benchmarkData.benchmark2 > cartData.subTotal
      ) {
        cartData.shippingCharge = fixedShippingPrice.fixed_shipping_price;
        cartData.subTotal += fixedShippingPrice.fixed_shipping_price;

        return cartData.save();
      } else if (
        !matchingFreeZipCode &&
        benchmarkData &&
        benchmarkData.benchmark1 < cartData.subTotal
      ) {
        if (cartData.shippingCharge > 0) {
          cartData.subTotal -= cartData.shippingCharge;
          cartData.shippingCharge = 0;

          return cartData.save();
        }
        return cartData;
      } else if (
        !matchingFreeZipCode &&
        benchmarkData &&
        benchmarkData.benchmark1 > cartData.subTotal
      ) {
        const getShipmentRateStateData = await ShipmentRateState.find();

        const isStateMatch =
          userDetails?.state &&
          getShipmentRateStateData.find(
            (x) => x.state?.toLowerCase() === userDetails?.state?.toLowerCase()
          );

        const totalWeight = cartData?.subTotalWeight;
        const packageDimension = await DimensionWeightRange.findOne({
          weight_range: { $gte: totalWeight },
        });

        let getDimention = null;

        if (packageDimension && packageDimension?.dimensions) {
          getDimention = await Dimension.findOne({
            dimensions: packageDimension.dimensions,
          });
        }

        if (isStateMatch && getDimention) {
          cartData.shippingCharge =
            getDimention.shipment_dimension_price +
            isStateMatch.shipment_state_rate;
          cartData.subTotal +=
            getDimention.shipment_dimension_price +
            isStateMatch.shipment_state_rate;

          return cartData.save();
        }

        return cartData;
      }
    }
    return cartData;
  } catch (error) {
    console.error("Error in addShippingCharge:", error);
    throw new ApiError(500, `Error adding shipping charge: ${error.message}`);
  }
};

// calculate product reviews

export const calculateProductReviews = async (productId) => {
  try {
    const productReviews = await Product.aggregate([
      {
        $match: { _id: productId },
      },
      {
        $lookup: {
          from: "productsreviews",
          localField: "_id",
          foreignField: "product",
          as: "productReviewDetails",
        },
      },
      {
        $unwind: {
          path: "$productReviewDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "productReviewDetails.user",
          foreignField: "_id",
          as: "userdetails",
        },
      },
      {
        $unwind: {
          path: "$userdetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          comment: "$productReviewDetails.comment",
          rating: "$productReviewDetails.rating",
          username: "$userdetails.username",
          _id: 0,
        },
      },
      {
        $match: {
          rating: { $exists: true },
        },
      },
    ]);

    const productLength = productReviews.length;

    if (productLength === 0) {
      return { productOverAllReviews: 0, allReviewsCount: 0 };
    }

    let productReviewsSum = 0;

    productReviews.forEach((product) => {
      productReviewsSum += product?.rating;
    });

    const productOverAllReviews = productReviewsSum / productLength;
    return {
      productOverAllReviews,
      allReviewsCount: productLength,
      reviews: productReviews,
    };
  } catch (error) {
    throw new ApiError(
      500,
      `Error calculating product reviews: ${error.message}`
    );
  }
};
