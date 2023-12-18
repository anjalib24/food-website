import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeCheckOutPayment = async (
  username,
  email,
  productName,
  productPrice
) => {
  try {
    const customer = await stripe.customers.create({
      name: username,
      email: email,
    });

    // Create a product
    const product = await stripe.products.create({
      name: productName,
    });

    // Create a price for the product
    const price = await stripe.prices.create({
      unit_amount: productPrice,
      currency: "usd",
      product: product.id,
    });

    const stripeData = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://your-website.com/success",
      cancel_url: "https://your-website.com/cancel",
    });

    return stripeData;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export { stripeCheckOutPayment };
