import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { productValidation } from "../../utils/Validation.js";
import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";
import {
  cartRepository,
  addItem,
  addShippingCharge,
} from "../../services/repository.js";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import { Country } from "../../models/country.model.js";
import AdmZip from "adm-zip";
import path, { parse } from "path";
import fs from "fs";
import { Cart } from "../../models/cart.model.js";
import Tax from "../../models/tax.model.js";
import ShipmentRateState from "../../models/shipmentRateState.model.js";
import ProductsReview from "../../models/productsReviews.model.js";

//------------get best seller------------

const getBestSeller = asyncHandler(async (req, res) => {
  const getBestsellerData = await Product.find({
    best_seller: true,
  }).populate("origin_country");
  return res
    .status(200)
    .json(new ApiResponse(200, getBestsellerData, "All best seller data."));
});

//------------get single order------------

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const getProduct = await Product.findById(id)
    .populate("origin_country")
    .populate("category");
  return res
    .status(200)
    .json(
      new ApiResponse(200, getProduct, "Single order data get successfully.")
    );
});

// calculate product reviews

const calculateProductReviews = async (productIds) => {
  const productReviews = await ProductsReview.find({
    product: { $in: productIds },
  });

  const productLenght = productReviews.length;
  if (productLenght === 0) {
    return { productOverAllReviews: 0, allReviewsCount: 0 };
  }

  let productReviewsSum = 0;

  productReviews.forEach((review) => {
    productReviewsSum += review.rating;
  });

  const productOverAllReviews = productReviewsSum / productLenght;

  return { productOverAllReviews, allReviewsCount: productLenght };
};

//get product data -----------
const getProductData = asyncHandler(async (req, res) => {
  try {
    let {
      title,
      short_description,
      description,
      origin_country,
      expiry_date,
      promotion_code,
      rank,
      best_seller,
    } = req.query;

    const price = req.body.price || 0;
    origin_country = origin_country && origin_country.toLowerCase();

    const filter = {};

    if (origin_country) {
      const country = await Country.findOne({ name: origin_country });

      if (country) {
        filter.origin_country = country._id;
      } else {
        return res
          .status(404)
          .json(new ApiResponse(404, null, "Country not found."));
      }
    }

    if (price) {
      const numericPrice = parseFloat(price.slice(1));
      if (!isNaN(numericPrice)) {
        filter.price = price.startsWith("+")
          ? { $gte: numericPrice }
          : { $lte: numericPrice };
      }
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = { page, limit };

    const paginatedProducts = await Product.paginate(filter, options);

    const categoryIds = paginatedProducts.docs.map(
      (product) => product.category
    );
    const countryIds = paginatedProducts.docs.map(
      (product) => product.origin_country
    );

    const productIds = paginatedProducts.docs.map((product) => product._id);

    const categories = await Category.find({ _id: { $in: categoryIds } });
    const countries = await Country.find({ _id: { $in: countryIds } });

    const productsWithCategories = await Promise.all(
      paginatedProducts.docs.map(async (product) => {
        const category = categories.find((cat) =>
          cat._id.equals(product.category)
        );
        const country = countries.find((cntry) =>
          cntry._id.equals(product.origin_country)
        );

        const getProductReviews = await calculateProductReviews(product._id);

        return {
          ...product.toObject(),
          category,
          country,
          productRating: getProductReviews?.productOverAllReviews || 0,
          productRatingCount: getProductReviews?.allReviewsCount || 0,
        };
      })
    );

    const getProducts = { ...paginatedProducts, docs: productsWithCategories };

    return res
      .status(200)
      .json(
        new ApiResponse(200, getProducts, "Get all product data successfully.")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error!"));
  }
});

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
    best_seller,
    weight,
    length,
    height,
    width,
  } = req.body;

  const countBestseller = await Product.find({
    best_seller: true,
  }).countDocuments();

  if (countBestseller > 15) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Best seller can't be more then 15."));
  }

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "No files were uploaded.");
  }

  const images = req.files && req.files["images"];

  let video =
    (req.files && req.files["video"] && req.files["video"][0].filename) || null;

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
    weight,
  };

  const { error } = productValidation.validate(productData);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  let imageArray = [];

  if (images && images.length > 0) {
    imageArray =
      images?.map((file) =>
        file.filename ? `/images/${file.filename}` : null
      ) || [];
  } else {
    throw new ApiError(400, "Product image is required!");
  }

  let zipFieldName =
    (req.files && req.files["zipFile"] && req.files["zipFile"][0].fieldname) ||
    null;
  let extractedZipFilesPath = null;

  if (zipFieldName === "zipFile") {
    const zipPath = req.files["zipFile"][0].path;
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const parentDirectory = path.resolve(__dirname, "..", "..", "..");
    const originalZipName = req.files["zipFile"][0].originalname;

    const fileNameWithoutExtension = path.parse(originalZipName).name;

    const uploadDir = path.join(
      parentDirectory,
      "/public/zipfiles",
      `${fileNameWithoutExtension}_${Date.now()}`
    );

    const zip = new AdmZip(zipPath);
    fs.unlinkSync(zipPath);

    zip.extractAllTo(uploadDir, true);

    const extractedZipFiles = fs.readdirSync(uploadDir);

    const specificPath = path.join(uploadDir, extractedZipFiles[0]);

    extractedZipFilesPath = path.relative(parentDirectory, specificPath);
  }
  const publicIndex =
    extractedZipFilesPath && extractedZipFilesPath.indexOf("public");

  const modifiedPath =
    extractedZipFilesPath && publicIndex !== -1
      ? extractedZipFilesPath.slice(publicIndex + "public".length)
      : extractedZipFilesPath;

  video = video && `/videos/${video}`;

  productData = {
    ...productData,
    images: imageArray,
    best_seller,
    zipFile_url: modifiedPath,
    video_url: video,
    length,
    height,
    width,
  };

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

// delete product data part-
const deleteProductData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id) {
    const deleteProduct = await Product.findByIdAndDelete({ _id: id });

    if (!deleteProduct) {
      throw new ApiError(500, "Something went wrong while deleting product");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(200, deleteProduct, "Product deleted successfully")
      );
  } else {
    throw new ApiError(400, "Invalid product ID!");
  }
});

// update product data part-
const updateProductData = asyncHandler(async (req, res) => {
  let productData = { ...req.body };
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Id is required!");
  }

  const isProductExist = await Product.findById(id);
  if (!isProductExist) {
    throw new ApiError(400, "This product does not exist in DB!");
  }

  const images = (req.files && req.files["images"]) || [];

  let video =
    (req.files && req.files["video"] && req.files["video"][0].filename) || null;

  let imageArray = [];

  imageArray =
    images?.map((file) =>
      file.filename ? `/images/${file.filename}` : null
    ) || [];

  if (imageArray && imageArray.length > 0) {
    productData = {
      ...productData,
      images: imageArray,
    };
  }

  video = video && `/videos/${video}`;

  if (video) {
    productData = {
      ...productData,
      video_url: video,
    };
  }

  let zipFieldName =
    (req.files && req.files["zipFile"] && req.files["zipFile"][0].fieldname) ||
    null;
  let extractedZipFilesPath = "";

  if (zipFieldName === "zipFile") {
    const zipPath = req.files["zipFile"][0].path;
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const parentDirectory = path.resolve(__dirname, "..", "..", "..");
    const originalZipName = req.files["zipFile"][0].originalname;

    const fileNameWithoutExtension = path.parse(originalZipName).name;

    const uploadDir = path.join(
      parentDirectory,
      "/public/zipfiles",
      `${fileNameWithoutExtension}_${Date.now()}`
    );

    const zip = new AdmZip(zipPath);
    fs.unlinkSync(zipPath);

    zip.extractAllTo(uploadDir, true);

    const extractedZipFiles = fs.readdirSync(uploadDir);
    const specificPath = path.join(uploadDir, extractedZipFiles[0]);

    extractedZipFilesPath = path.relative(parentDirectory, specificPath);
  }
  const publicIndex = extractedZipFilesPath.indexOf("public");
  const modifiedPath =
    publicIndex !== -1
      ? extractedZipFilesPath.slice(publicIndex + "public".length)
      : extractedZipFilesPath;

  if (extractedZipFilesPath) {
    productData = {
      ...productData,
      zipFile_url: modifiedPath,
    };
  }

  if (id) {
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      productData
    );

    if (!updateProduct) {
      throw new ApiError(500, "Something went wrong while updating product");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, updateProduct, "Product update successfully"));
  } else {
    throw new ApiError(400, "Invalid product ID!");
  }
});

//create product category part-
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

//get all product category part-
const getAllCategory = asyncHandler(async (req, res) => {
  const getAllCategory = await Category.find();

  return res
    .status(201)
    .json(
      new ApiResponse(200, getAllCategory, "Get all category successfully")
    );
});

//create country part -
const createCountry = asyncHandler(async (req, res) => {
  let { name } = req.body.countryData;
  name = name && name.toLowerCase();

  if (!name) {
    throw new ApiError(400, "Country name is required!");
  }

  const existingCountry = await Country.findOne({ name });

  if (existingCountry) {
    throw new ApiError(403, "Country already exists!");
  }

  const newCountry = await Country.create({ name });

  if (!newCountry) {
    throw new ApiError(500, "Something went wrong while creating the Country");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, newCountry, "Country created successfully"));
});

//get all country part-
const getAllCountry = asyncHandler(async (req, res) => {
  const getAllCountry = await Country.find();

  return res
    .status(201)
    .json(new ApiResponse(200, getAllCountry, "Get all country successfully"));
});

// tax calculate
const calculateTax = async (totalPrice, userData) => {
  try {
    const stateCodes = await ShipmentRateState.find();
    const userStateCode = stateCodes.find(
      (state) => state?.state?.toLowerCase() === userData?.state?.toLowerCase()
    )?.state_code;

    const taxData = await Tax.find();
    const stateTaxData = taxData.find(
      (tax) => tax?.state_code?.toLowerCase() === userStateCode?.toLowerCase()
    );

    const taxRatePrice = +stateTaxData?.state_tax_rate || 0;
    const taxAmount =
      totalPrice + Math.round(totalPrice * (taxRatePrice / 100));
    const taxRate = Math.round(totalPrice * (taxRatePrice / 100));
    return { taxAmount, taxRate };
  } catch (error) {
    console.error("Error in calculateTax:", error);
    throw new ApiError(500, "Something went wrong while calculating tax.");
  }
};

// product add to cart -----------
const addItemToCart = asyncHandler(async (req, res) => {
  const productsData = req.body;
  if (
    !Array.isArray(productsData) ||
    productsData.length === 0 ||
    Object.keys(productsData[0]).length === 0
  ) {
    throw new ApiError(400, "At least one non-empty product is required!");
  }

  const token =
    req.headers["authorization"]?.replace("Bearer", "").trim() ||
    req.cookies["cookie_token"];

  if (!token) {
    throw new ApiError(400, "Unauthorized user!");
  }
  const userID = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)._id;

  const existedUser = await User.findOne({ _id: userID });

  if (!existedUser) {
    throw new ApiError(404, "User Not Found!");
  }

  let cartDataWithShippingCharge = {};

  for (let data of productsData) {
    const { productId, quantity: productQuantity } = data;

    const quantity = Number.parseInt(productQuantity);
    if (quantity == 0) {
      throw new ApiError(500, "Quantity can not be equal to zero");
    }
    try {
      let cart = await cartRepository(existedUser._id);

      let productDetails = await Product.findById({ _id: productId });
      if (!productDetails) {
        throw new ApiError(404, "Product Not Found!");
      }
      //--If Cart Exists ----
      if (cart) {
        if (quantity < 0) {
          // Handle case where quantity is less than 0 (decrease quantity)
          const existingItemIndex = cart.items.findIndex(
            (item) => item.productId == productId
          );

          if (
            cart.items[existingItemIndex].quantity > 1 &&
            existingItemIndex !== -1
          ) {
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].total =
              cart.items[existingItemIndex].quantity * productDetails.price;

            cart.items[existingItemIndex].totalWeight =
              cart.items[existingItemIndex].quantity * productDetails.weight;

            const getTotalPrice = cart.items
              .map((item) => item.total)
              .reduce((acc, next) => acc + next);
            const calculateTaxData = await calculateTax(
              getTotalPrice,
              existedUser
            );
            cart.subTotal = calculateTaxData.taxAmount;
            cart.tax = calculateTaxData.taxRate;
            cart.subTotalWeight = cart.items
              .map((item) => item.totalWeight)
              .reduce((acc, next) => acc + next);
          } else {
            throw new ApiError(404, "Can not decrease quantity anymore.");
          }
        } else {
          // Handle other cases (quantity > 0 or quantity === 0)
          const indexFound = cart.items.findIndex(
            (item) => item.productId == productId
          );

          if (indexFound !== -1) {
            cart.items[indexFound].quantity += quantity;
            cart.items[indexFound].total =
              cart.items[indexFound].quantity * productDetails.price;
            cart.items[indexFound].price = productDetails.price;

            cart.items[indexFound].totalWeight =
              cart.items[indexFound].quantity * productDetails.weight;

            const getTotalPrice = cart.items
              .map((item) => item.total)
              .reduce((acc, next) => acc + next);
            const calculateTaxData = await calculateTax(
              getTotalPrice,
              existedUser
            );
            cart.subTotal = calculateTaxData.taxAmount;
            cart.tax = calculateTaxData.taxRate;
            cart.subTotalWeight = cart.items
              .map((item) => item.totalWeight)
              .reduce((acc, next) => acc + next);
          } else if (quantity > 0) {
            // If the item is not found and quantity is greater than 0, add a new item
            cart.items.push({
              productId: productId,
              quantity: quantity,
              price: productDetails.price,
              total: parseInt(productDetails.price * quantity),
              weight: productDetails.weight,
              totalWeight: parseFloat(productDetails.weight * quantity),
            });
            const getTotalPrice = cart.items
              .map((item) => item.total)
              .reduce((acc, next) => acc + next);
            const calculateTaxData = await calculateTax(
              getTotalPrice,
              existedUser
            );
            cart.subTotal = calculateTaxData.taxAmount;
            cart.tax = calculateTaxData.taxRate;
            cart.subTotalWeight = cart.items
              .map((item) => item.totalWeight)
              .reduce((acc, next) => acc + next);
          } else {
            // If quantity is 0, throw an error
            throw new ApiError(400, "Product Not Found!");
          }
        }
        let data = await cart.save();

        if (data) {
          const getCartData = await addShippingCharge(data);
          cartDataWithShippingCharge = {
            ...cartDataWithShippingCharge,
            getCartData,
          };
        }
      }
      //------------ This creates a new cart and then adds the item to the cart that has been created------------
      else {
        const cartData = {
          user_id: existedUser._id,
          items: [
            {
              productId: productId,
              quantity: quantity,
              total: parseInt(productDetails.price * quantity),
              price: productDetails.price,
              weight: productDetails.weight,
              totalWeight: parseFloat(productDetails.weight * quantity),
            },
          ],
          subTotalWeight: parseFloat(productDetails.weight * quantity),
        };
        const getTotalPrice = await calculateTax(
          parseInt(productDetails.price * quantity),
          existedUser
        );
        cartData.subTotal = getTotalPrice?.taxAmount;
        cartData.tax = getTotalPrice?.taxRate;

        cart = await addItem(cartData);
        if (cart) {
          const getCartData = await addShippingCharge(cart);
          cartDataWithShippingCharge = {
            ...cartDataWithShippingCharge,
            getCartData,
          };
        }
      }
    } catch (err) {
      throw new ApiError(400, err);
    }
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, cartDataWithShippingCharge, "Items added successful")
    );
});

const getCart = asyncHandler(async (req, res) => {
  const token =
    req.headers["authorization"]?.replace("Bearer", "").trim() ||
    req.cookies["cookie_token"];
  if (!token) {
    throw new ApiError(400, "Unauthorized user!");
  }

  const userID = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)._id;
  let cart = await cartRepository(userID);
  if (!cart) {
    return res.status(200).json(new ApiResponse(200, {}, "Cart not Found!"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Items added successful"));
});

const emptyCart = asyncHandler(async (req, res) => {
  const token =
    req.headers["authorization"]?.replace("Bearer", "").trim() ||
    req.cookies["cookie_token"];
  if (!token) {
    throw new ApiError(400, "Unauthorized user!");
  }

  const userID = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)._id;
  let cart = await cartRepository(userID);
  cart.items = [];
  cart.subTotal = 0;
  cart.subTotalWeight = 0;
  cart.shippingCharge = 0;
  cart.tax = 0;

  let data = await cart.save();
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Cart has been emptied"));
});

const removeItemsFromCart = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "Product ID is required!");
    }

    const token =
      req.headers["authorization"]?.replace("Bearer", "").trim() ||
      req.cookies["cookie_token"];

    if (!token) {
      throw new ApiError(401, "Unauthorized user! Token not found.");
    }

    const userID = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)._id;

    if (!userID) {
      throw new ApiError(401, "Invalid user token.");
    }

    const user = await User.findById(userID);
    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found!");
    }

    let cart = await Cart.findOne({ user_id: userID });

    if (!cart) {
      throw new ApiError(404, "Cart not found for the user.");
    }

    if (cart.items.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, cart, "There is no product in the cart."));
    }

    const matchingItem = cart.items.find(
      (item) => item.productId.toString() === product._id.toString()
    );

    if (!matchingItem) {
      return res
        .status(200)
        .json(new ApiResponse(200, cart, "Product not found in the cart."));
    }

    const productTotalPrice = matchingItem.total;

    let newSubTotal = cart.subTotal - productTotalPrice;

    let update = {
      $pull: {
        items: {
          productId: product._id,
        },
      },
      $set: {
        subTotal: newSubTotal,
      },
    };

    const updatedCartData = await Cart.findOneAndUpdate(
      {
        _id: cart._id,
      },
      update,
      {
        new: true,
      }
    );
    if (!updatedCartData) {
      throw new ApiError(500, "Update failed or document not found");
    }

    if (updatedCartData?.items.length === 0) {
      updatedCartData.subTotal = 0;
      updatedCartData.subTotalWeight = 0;
      updatedCartData.shippingCharge = 0;
      updatedCartData.tax = 0;

      await updatedCartData.save();
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedCartData, "Product removed from cart.")
      );
  } catch (error) {
    console.error(error);
    throw new ApiError(
      error.status || 500,
      error.message || "Internal Server Error"
    );
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  try {
    const { id: product_id } = req.params;
    const { rating } = req.body;

    if (!product_id) {
      throw new ApiError(400, "Product ID is required!");
    }

    const existingReview = await ProductsReview.findOne({
      user: req.user._id,
      product: product_id,
    });

    if (existingReview) {
      return res.status(400).json({
        error: "User has already submitted a review for this product.",
      });
    }

    const newReview = new ProductsReview({
      user: req.user._id,
      product: product_id,
      rating,
    });

    const savedReview = await newReview.save();

    res
      .status(201)
      .json(new ApiResponse(201, savedReview, "Review created successfully."));
  } catch (error) {
    console.error(error);

    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

export {
  createProductData,
  createCategory,
  getAllCategory,
  getProductData,
  deleteProductData,
  updateProductData,
  addItemToCart,
  getCart,
  emptyCart,
  getAllCountry,
  createCountry,
  getBestSeller,
  getProductById,
  removeItemsFromCart,
  createProductReview,
};
