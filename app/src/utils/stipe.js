// import Stripe from "stripe";
// import { Product } from "../models/product.model.js";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const orderWithStripeCheckOutPayment = async (username, email, products) => {
//   try {
//     const customer = await stripe.customers.create({
//       name: username,
//       email: email,
//     });

//     const lineItems = await Promise.all(
//       products.items.map(async (product) => {
//         const productData = await Product.findById({ _id: product.productId });

//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: productData.title,
//             },
//             unit_amount: product.price,
//           },
//           quantity: product.quantity,
//         };
//       })
//     );
//     const stripeData = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       customer: customer.id,
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://127.0.0.1:8000/api/v1/order/success",
//       cancel_url: "https://your-website.com/cancel",
//     });

//     return stripeData;
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// };

// export { orderWithStripeCheckOutPayment };

import Stripe from "stripe";
import { Product } from "../models/product.model.js";
import { ApiError } from "./ApiError.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const orderWithStripeCheckOutPayment = async (
  username,
  email,
  products,
  shippingCharge = 0
) => {
  try {
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
      success_url: "http://62.72.1.123:8000/paymentsucess",
      cancel_url: "http://62.72.1.123:8000/paymentcancle",
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
