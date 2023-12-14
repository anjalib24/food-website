import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { productValidation } from "../../utils/Validation.js";
import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.js";
import { cartRepository, addItem } from "../../services/repository.js";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";

//get product data -----------
const getProductData = asyncHandler(async (req, res) => {
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

  const filter = {};

  if (origin_country) filter.origin_country = origin_country;
  if (best_seller) filter.best_seller = best_seller;

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

  const categoryIds = paginatedProducts.docs.map((product) => product.category);

  const categories = await Category.find({ _id: { $in: categoryIds } });

  const productsWithCategories = paginatedProducts.docs.map((product) => {
    const category = categories.find((category) =>
      category._id.equals(product.category)
    );
    return { ...product.toObject(), category };
  });

  const getProducts = { ...paginatedProducts, docs: productsWithCategories };

  return res
    .status(200)
    .json(
      new ApiResponse(200, getProducts, "Get all product data successfully")
    );
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
  } = req.body;

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "No files were uploaded.");
  }

  const images = req.files["images"];

  let video = (req.files["video"] && req.files["video"][0].filename) || null;

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

  let imageArray = [];

  if (images && images.length > 0) {
    imageArray = images.map((file) => {
      return `/images/${file.filename}`;
    });
  } else {
    throw new ApiError(400, "Product image is required!");
  }

  productData = {
    ...productData,
    images: imageArray,
    best_seller,
    video_url: `/videos/${video}`,
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
  const { id } = req.params;
  if (id) {
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      req.body
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

// product add to cart -----------

const addItemToCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const token = req.cookies["cookie_token"];

  if (!token) {
    throw new ApiError(400, "Unauthorized user!");
  }
  const userID = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)._id;

  const existedUser = await User.findOne({ _id: userID });

  if (!existedUser) {
    throw new ApiError(404, "User Not Found!");
  }

  const quantity = Number.parseInt(req.body.quantity);
  if (quantity <= 0) {
    throw new ApiError(500, "Quantity can not be less then or equal to zero");
  }
  try {
    let cart = await cartRepository();
    let productDetails = await Product.findById({ _id: productId });
    if (!productDetails) {
      throw new ApiError(404, "Product Not Found!");
    }
    //--If Cart Exists ----
    if (cart) {
      //current user card

      if (cart.user.equals(existedUser._id)) {
        //---- Check if index exists ----
        const indexFound = cart.items.findIndex(
          (item) => item.productId.id == productId
        );
        //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
        if (indexFound !== -1 && quantity <= 0) {
          cart.items.splice(indexFound, 1);
          if (cart.items.length == 0) {
            cart.subTotal = 0;
          } else {
            cart.subTotal = cart.items
              .map((item) => item.total)
              .reduce((acc, next) => acc + next);
          }
        }
        //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
        else if (indexFound !== -1) {
          cart.items[indexFound].quantity =
            cart.items[indexFound].quantity + quantity;
          cart.items[indexFound].total =
            cart.items[indexFound].quantity * productDetails.price;
          cart.items[indexFound].price = productDetails.price;
          cart.subTotal = cart.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
        //----Check if quantity is greater than 0 then add item to items array ----
        else if (quantity > 0) {
          cart.items.push({
            productId: productId,
            quantity: quantity,
            price: productDetails.price,
            total: parseInt(productDetails.price * quantity),
          });
          cart.subTotal = cart.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
        //----If quantity of price is 0 throw the error -------
        else {
          throw new ApiError(400, "Product Not Found!");
        }
        let data = await cart.save();

        res.status(200).json(new ApiResponse(200, data, "Process successful"));
      } else {
        // The cart user does not match the existedUser ID
        throw new ApiError(401, "Unauthorized user!");
      }
    }
    //------------ This creates a new cart and then adds the item to the cart that has been created------------
    else {
      const cartData = {
        user: existedUser._id,
        items: [
          {
            productId: productId,
            quantity: quantity,
            total: parseInt(productDetails.price * quantity),
            price: productDetails.price,
          },
        ],
        subTotal: parseInt(productDetails.price * quantity),
      };
      cart = await addItem(cartData);
      res
        .status(200)
        .json(new ApiResponse(200, cart, "Items added successful"));
    }
  } catch (err) {
    throw new ApiError(400, "Something went wrong");
  }
});

const getCart = async (req, res) => {
  try {
    let cart = await cartRepository();
    if (!cart) {
      throw new ApiError(400, "Cart not Found!");
    }
    res.status(200).json(new ApiResponse(200, cart, "Items added successful"));
  } catch (err) {
    throw new ApiError(400, "Something went wrong");
  }
};

const emptyCart = async (req, res) => {
  try {
    let cart = await cartRepository();
    cart.items = [];
    cart.subTotal = 0;
    let data = await cart.save();
    res.status(200).json(new ApiResponse(200, data, "Cart has been emptied"));
  } catch (err) {
    throw new ApiError(400, "Something went wrong");
  }
};

export {
  createProductData,
  createCategory,
  getProductData,
  deleteProductData,
  updateProductData,
  addItemToCart,
  getCart,
  emptyCart,
};
