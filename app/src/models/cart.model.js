import mongoose, { Schema } from "mongoose";

let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    totalWeight: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CartSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [ItemSchema],
    shippingCharge: {
      type: Number,
      default: 0,
    },
    subTotal: {
      default: 0,
      type: Number,
    },
    subTotalWeight: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
export const Cart = mongoose.model("Cart", CartSchema);
