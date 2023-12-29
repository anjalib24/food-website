import mongoose from "mongoose";

const freeZipCodeSchema = new mongoose.Schema(
  {
    zipCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FreeZipCode = mongoose.model("FreeZipCode", freeZipCodeSchema);
