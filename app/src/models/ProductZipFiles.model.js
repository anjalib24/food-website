import mongoose from "mongoose";

const ProductZipFileSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  zipFile: {
    type: Object,
  },
});

const ProductZipFile = mongoose.model("ProductZipFile", ProductZipFileSchema);

export default ProductZipFile;
