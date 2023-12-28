import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { orderWithStripeCheckOutPayment } from "../../utils/stipe.js";
import { User } from "../../models/user.model.js";
import { Order } from "../../models/order.model.js";
import { Cart } from "../../models/cart.model.js";
import Stripe from "stripe";

const getProductIds = async (products) => {
  const productPromises = products.map(async (product) => product.productId);
  const resolvedProductIds = await Promise.all(productPromises);
  return resolvedProductIds;
};

const orderProductPaymentWithStripe = asyncHandler(async (req, res) => {
  const { id: cartId } = req.params;

  const orderDate = new Date().getDate();

  if (!cartId) {
    throw new ApiError(400, "Cart id is required");
  }

  const cartData = await Cart.findById({
    _id: cartId,
  });

  if (!cartData) {
    throw new ApiError(409, "Cart  not found!");
  }

  const existedUser = await User.findById({ _id: cartData.user_id });

  if (!existedUser) {
    throw new ApiError(409, "User not found!");
  }

  const stripeOrderData = await orderWithStripeCheckOutPayment(
    existedUser.username,
    existedUser.email,
    cartData,
    cartData.shippingCharge
  );

  if (!stripeOrderData.id) {
    throw new ApiError(409, "Something went wrong while order payment process");
  }

  let orderData = null;
  if (stripeOrderData.id) {
    const productIds = await getProductIds(cartData.items);

    const order = new Order({
      user_id: existedUser._id,
      username: existedUser.username,
      email: existedUser.email,
      products: productIds,
      pyamentOrderId: stripeOrderData.id,
      status: "pending",
    });
    orderData = await order.save();
    if (!orderData) {
      throw new ApiError(
        409,
        "Something went wrong while inserting order data"
      );
    }
  }
  orderData = { ...orderData, sessionID: stripeOrderData?.id };
  return res
    .status(201)
    .json(new ApiResponse(200, orderData, "Stipe Process successfully"));
});

const orderSuccess = asyncHandler(async (req, res) => {
  res.sendStatus(200).json("Payment successfull!");
});

const stripeWebHookHandler = asyncHandler(async (req, res) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_ENDPOINT_SECRET) {
    throw new ApiError(500, "Stripe environment variables are not set.");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    throw new ApiError(400, "Webhook signature verification failed.");
  }

  let orderData = null;
  switch (event.type) {
    case "checkout.session.completed":
      orderData = await handleCheckoutSessionCompleted(event.data.object);
      if (!orderData) {
        return res
          .status(201)
          .json(new ApiResponse(200, null, "Order not fulfilled."));
      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return res
    .status(201)
    .json(new ApiResponse(200, orderData, "Order fulfilled successfully."));
});

const handleCheckoutSessionCompleted = async (session) => {
  const orderId = session.metadata.orderId;

  if (orderId) {
    try {
      const orderUpdateData = await Order.findByIdAndUpdate(orderId, {
        status: "fulfilled",
      });

      console.log(`Order ${orderId} has been fulfilled.`);
      if (!orderUpdateData) {
        throw new ApiError(
          409,
          "Something went wrong while updating order data"
        );
      }

      return orderUpdateData;
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
    }
  } else {
    console.error("Invalid orderId in checkout session:", session.id);
  }
};

export { orderProductPaymentWithStripe, orderSuccess, stripeWebHookHandler };
