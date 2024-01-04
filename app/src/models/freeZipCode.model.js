import mongoose from "mongoose";

const freeZipCodeSchema = new mongoose.Schema(
  {
    zipCode: {
      type: String,
      required: true,
      unique: true,
    },
    shipment_delivery_message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FreeZipCode = mongoose.model("FreeZipCode", freeZipCodeSchema);
