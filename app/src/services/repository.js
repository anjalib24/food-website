import { Cart } from "../models/cart.model.js";

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
