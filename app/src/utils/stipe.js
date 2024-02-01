import Stripe from "stripe";
import { Product } from "../models/product.model.js";
import { ApiError } from "./ApiError.js";
import dotenv from "dotenv";
dotenv.config();

const orderWithStripeCheckOutPayment = async (
  username,
  email,
  products,
  shippingCharge = 0
) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const customer = await stripe.customers.create({
      name: username,
      email: email,
    });

    const lineItems = await Promise.all(
      products.items.map(async (product) => {
        const productData = await Product.findById({ _id: product.productId });

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: productData.title,
            },
            unit_amount: product.price * 100, // convert to cent unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        };
      })
    );

    // Add a line item for shipping charge
    if (shippingCharge > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping Charge",
          },
          unit_amount: shippingCharge * 100, //conver to cent unit_amount: shippingCharge*100
        },
        quantity: 1,
      });
    }

    const stripeData = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: lineItems,
      mode: "payment",
      success_url: "https://ethnicfoods.com/paymentsucess",
      cancel_url: "https://ethnicfoods.com/paymentcancle",
    });

    return stripeData;
  } catch (error) {
    throw new ApiError(
      400,
      "Error:",
      error.message ||
        error.Error ||
        "Something went wrong while stripe checkout."
    );
  }
};

export { orderWithStripeCheckOutPayment };

// import stripePackage from "stripe";
// import { ApiError } from "./ApiError.js";

// const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

// const orderWithStripeCheckOutPayment = async (
//   username,
//   email,
//   products,
//   shippingCharge = 0
// ) => {
//   try {
//     const customer = await stripe.customers.create({
//       name: username,
//       email: email,
//     });

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: calculateOrderAmount(products, shippingCharge),
//       currency: "usd",
//       customer: customer.id,
//     });

//     console.log("paymentIntent ->", paymentIntent);

//     return {
//       clientSecret: paymentIntent.client_secret,
//     };
//   } catch (error) {
//     throw new ApiError(
//       400,
//       "Error:",
//       error.message ||
//         error.Error ||
//         "Something went wrong with Stripe payment."
//     );
//   }
// };

// // calculate the order amount
// const calculateOrderAmount = (products, shippingCharge) => {
//   let totalAmount = shippingCharge;

//   products.items.forEach((product) => {
//     totalAmount += product.price * product.quantity;
//   });

//   return totalAmount * 100; // Convert to cents
// };

// export { orderWithStripeCheckOutPayment };
