import mongoose from "mongoose";

const benchmarkSchema = new mongoose.Schema({
  benchmark: {
    type: Number,
    required: true,
  },
  benchmark1: {
    type: Number,
    required: true,
  },
});

export const Benchmark = mongoose.model("Benchmark", benchmarkSchema);
