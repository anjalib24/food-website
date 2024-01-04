import { FreeZipCode } from "../../models/freeZipCode.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import csvParser from "csv-parser";
import fs from "fs";

export const createFreeZipCode = async (req, res) => {
  try {
    const { zipCode, shipment_delivery_message } = req.body;
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

    const newFreeZipCode = new FreeZipCode({
      zipCode,
      shipment_delivery_message,
    });
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

// Read all FreeZipCodes
export const getAllFreeZipCodes = async (req, res) => {
  try {
    const freeZipCodes = await FreeZipCode.find();
    return res.json(new ApiResponse(200, freeZipCodes, "Success"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// Read one FreeZipCode by ID
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

// Update FreeZipCode by ID
export const updateFreeZipCode = async (req, res) => {
  try {
    const { zipCode, shipment_delivery_message } = req.body;
    const updatedFreeZipCode = await FreeZipCode.findByIdAndUpdate(
      req.params.id,
      { zipCode, shipment_delivery_message },
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

// Delete FreeZipCode by ID
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
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const freeZipCodeCsvFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(new ApiError(400, "No CSV file uploaded"));
    }

    const filePath = req.file.path;

    const stream = fs.createReadStream(filePath).pipe(csvParser());
    const updatedFreeZipCodes = [];
    let documentsProcessedCount = 0;
    const promises = [];

    stream.on("data", (row) => {
      const { zip_code: zipCode, shipment_delivery_message } = row;

      const filter = { zipCode };
      const update = { $set: { shipment_delivery_message } };
      const options = { upsert: true, new: true };

      const promise = FreeZipCode.findOneAndUpdate(filter, update, options)
        .then((updatedFreeZipCode) => {
          if (!updatedFreeZipCode) {
            return FreeZipCode.create({ zipCode, shipment_delivery_message });
          }
          return updatedFreeZipCode;
        })
        .then((result) => {
          updatedFreeZipCodes.push(result);
          documentsProcessedCount++;
        })
        .catch((updateError) => {
          console.error(
            `Error updating/inserting document with zipCode ${zipCode}: ${updateError.message}`
          );
        });

      promises.push(promise);
    });

    stream.on("end", async () => {
      try {
        await Promise.all(promises);
        fs.unlinkSync(filePath);

        res
          .status(200)
          .json(
            new ApiResponse(
              200,
              updatedFreeZipCodes,
              `CSV file processed successfully. ${documentsProcessedCount} documents processed.`
            )
          );
      } catch (promiseAllError) {
        console.error(`Error in Promise.all: ${promiseAllError.message}`);
        return res.status(500).json(new ApiError(500, promiseAllError.message));
      }
    });
  } catch (error) {
    console.error("Error processing CSV file:", error.message);
    return res.status(500).json(new ApiError(500, error.message));
  }
};
