import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  origin_country: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  rotate360lip: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  video_url: {
    type: String,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
  promotion_code: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
