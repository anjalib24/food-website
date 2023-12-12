import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { productValidation } from "../../utils/Validation.js";
import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.js";

// get product data part-
const getProductData = asyncHandler(async (req, res) => {});

//create product part-

const createProductData = asyncHandler(async (req, res) => {
  const {
    title,
    short_description,
    description,
    origin_country,
    price,
    expiry_date,
    promotion_code,
    rank,
    categoryID,
  } = req.body;

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "No files were uploaded.");
  }

  let productData = {
    title,
    short_description,
    description,
    origin_country,
    price,
    expiry_date,
    promotion_code,
    rank,
    category: categoryID,
  };

  const { error } = productValidation.validate(productData);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const imageArray = req.files.map((file) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
      return file.path;
    }
  });

  productData = { ...productData, images: imageArray };

  const existingCategory = await Category.findById(categoryID);
  if (!existingCategory) {
    throw new ApiError(400, "Invalid category ID!");
  }

  const newProduct = await Product.create(productData);

  if (!newProduct) {
    throw new ApiError(500, "Something went wrong while creating product data");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, newProduct, "Product created successfully"));
});

//createproduct category part-

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body.categoryData;

  if (!name) {
    throw new ApiError(400, "Category name is required!");
  }

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    throw new ApiError(403, "Category already exists!");
  }

  const newCategory = await Category.create({ name });

  if (!newCategory) {
    throw new ApiError(500, "Something went wrong while creating the category");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, newCategory, "Category created successfully"));
});

export { createProductData, createCategory };
