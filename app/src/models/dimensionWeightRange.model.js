import mongoose from "mongoose";

const dimensionWeightRangeSchema = new mongoose.Schema({
  dimensions: String,
  weight_range: String,
});

const DimensionWeightRange = mongoose.model(
  "DimensionWeightRange",
  dimensionWeightRangeSchema
);

export default DimensionWeightRange;
