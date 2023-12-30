import { FreeZipCode } from "../../models/freeZipCode.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

// Create
export const createFreeZipCode = async (req, res) => {
  try {
    const { zipCode } = req.body;
    const isFreeZipCodeExist = await FreeZipCode.findOne({ zipCode });
    if (isFreeZipCodeExist) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            isFreeZipCodeExist,
            "Free zip code already exists."
          )
        );
    }

    const newFreeZipCode = new FreeZipCode({ zipCode });
    const savedFreeZipCode = await newFreeZipCode.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          savedFreeZipCode,
          "Free zip code created successfully."
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(400, error.message || error.Error));
  }
};

// Read all
export const getAllFreeZipCodes = async (req, res) => {
  try {
    const freeZipCodes = await FreeZipCode.find();
    return res.json(new ApiResponse(200, freeZipCodes, "Success"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// Read one
export const getOneFreeZipCode = async (req, res) => {
  try {
    const freeZipCode = await FreeZipCode.findById(req.params.id);
    if (!freeZipCode) {
      return res.status(404).json(new ApiError(404, "Free Zip Code not found"));
    }
    res.json(new ApiResponse(200, freeZipCode, "Success"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// Update
export const updateFreeZipCode = async (req, res) => {
  try {
    const { zipCode } = req.body;
    const updatedFreeZipCode = await FreeZipCode.findByIdAndUpdate(
      req.params.id,
      { zipCode },
      { new: true }
    );
    if (!updatedFreeZipCode) {
      return res.status(404).json(new ApiError(404, "Free Zip Code not found"));
    }
    res.json(new ApiResponse(200, updatedFreeZipCode, "Success"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// Delete
export const deleteFreeZipCode = async (req, res) => {
  try {
    const deletedFreeZipCode = await FreeZipCode.findByIdAndDelete(
      req.params.id
    );
    if (!deletedFreeZipCode) {
      return res.status(404).json(new ApiError(404, "Free Zip Code not found"));
    }
    return res.json(
      new ApiResponse(
        200,
        { message: "Success" },
        "Free Zip Code deleted successfully"
      )
    );
  } catch (error) {
    returnres.status(500).json(new ApiError(500, error.message));
  }
};
