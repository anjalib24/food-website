import fs from "fs";
import csvParser from "csv-parser";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Dimension from "../../models/Dimensions.model.js";
import DimensionWeightRange from "../../models/dimensionWeightRange.model.js";

export const dimensionCsvFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(new ApiError(400, "No CSV file uploaded"));
    }

    const filePath = req.file.path;
    const updatedDimensions = [];
    let documentsProcessedCount = 0;
    const promises = [];

    const stream = fs.createReadStream(filePath).pipe(csvParser());

    stream.on("data", async (row) => {
      const {
        Dimensions,
        Length,
        Width,
        Height,
        "Shipment Dimension Price": shipment_dimension_price,
      } = row;

      try {
        const filter = {
          length: parseFloat(Length),
          width: parseFloat(Width),
          height: parseFloat(Height),
        };
        const update = {
          $set: {
            dimensions: Dimensions,
            length: parseFloat(Length),
            width: parseFloat(Width),
            height: parseFloat(Height),
            shipment_dimension_price: shipment_dimension_price
              ? parseFloat(shipment_dimension_price.replace("$", ""))
              : 0,
          },
        };
        const options = { upsert: true, new: true };

        const promise = Dimension.findOneAndUpdate(filter, update, options)
          .then((updatedData) => {
            if (!updatedData) {
              return Dimension.create({
                dimensions: Dimensions,
                length: parseFloat(Length),
                width: parseFloat(Width),
                height: parseFloat(Height),
                shipment_dimension_price: shipment_dimension_price
                  ? parseFloat(shipment_dimension_price.replace("$", ""))
                  : 0,
              });
            }
            return updatedData;
          })
          .then((result) => {
            updatedDimensions.push(result);
            documentsProcessedCount++;
          })
          .catch((updateError) => {
            console.error(
              `Error updating/inserting document with dimensions ${JSON.stringify(
                row
              )}: ${updateError.message}`
            );
          });

        promises.push(promise);
      } catch (updateError) {
        console.error(
          `Error updating/inserting document with dimensions ${JSON.stringify(
            row
          )}: ${updateError.message}`
        );
      }
    });

    stream.on("end", async () => {
      try {
        await Promise.all(promises);
        console.log("After Promise.all:", updatedDimensions.length);

        fs.unlinkSync(filePath);

        res
          .status(200)
          .json(
            new ApiResponse(
              200,
              updatedDimensions,
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

export const dimensionWeightRangeCsvFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(new ApiError(400, "No CSV file uploaded"));
    }

    const filePath = req.file.path;
    const updatedDimensionWeightRanges = [];
    let documentsProcessedCount = 0;
    const promises = [];

    const stream = fs.createReadStream(filePath).pipe(csvParser());

    stream.on("data", async (row) => {
      const { Dimensions: dimensions, "Weight Range": weight_range } = row;

      try {
        const filter = { dimensions, weight_range };
        const update = { $set: { dimensions, weight_range } };
        const options = { upsert: true, new: true };
        const promise = DimensionWeightRange.findOneAndUpdate(
          filter,
          update,
          options
        )
          .then((updatedData) => {
            if (!updatedData) {
              return DimensionWeightRange.create({ dimensions, weight_range });
            }
            return updatedData;
          })
          .then((result) => {
            updatedDimensionWeightRanges.push(result);
            documentsProcessedCount++;
          })
          .catch((updateError) => {
            console.error(
              `Error updating/inserting document with dimensions and weight_range ${JSON.stringify(
                row
              )}: ${updateError.message}`
            );
          });

        promises.push(promise);
      } catch (updateError) {
        console.error(
          `Error updating/inserting document with dimensions and weight_range ${JSON.stringify(
            row
          )}: ${updateError.message}`
        );
      }
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
              updatedDimensionWeightRanges,
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
