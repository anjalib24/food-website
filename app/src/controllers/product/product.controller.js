import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { productValidation } from "../../utils/Validation.js";
import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.js";
import { cartRepository, addItem } from "../../services/repository.js";

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
  const getProducts = await Product.paginate(filter, options, {
    populate: "category",
  });

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
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg"
    ) {
      return `/images/${file.filename}`;
    }
  });

  productData = { ...productData, images: imageArray, best_seller };

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
  const quantity = Number.parseInt(req.body.quantity);
  try {
    let cart = await cartRepository();
    let productDetails = await Product.findById({ _id: productId });
    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid request",
      });
    }
    //--If Cart Exists ----
    if (cart) {
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
        return res.status(400).json({
          type: "Invalid",
          msg: "Invalid request",
        });
      }
      let data = await cart.save();
      res.status(200).json({
        type: "success",
        mgs: "Process successful",
        data: data,
      });
    }
    //------------ This creates a new cart and then adds the item to the cart that has been created------------
    else {
      const cartData = {
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
      res.json(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
});

const getCart = async (req, res) => {
  try {
    let cart = await cartRepository();
    if (!cart) {
      return res.status(400).json({
        type: "Invalid",
        msg: "Cart not Found",
      });
    }
    res.status(200).json({
      status: true,
      data: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
};

const emptyCart = async (req, res) => {
  try {
    let cart = await cartRepository();
    cart.items = [];
    cart.subTotal = 0;
    let data = await cart.save();
    res.status(200).json({
      type: "success",
      mgs: "Cart has been emptied",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
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
