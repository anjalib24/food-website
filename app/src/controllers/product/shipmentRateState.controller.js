import fs from "fs";
import csvParser from "csv-parser";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import ShipmentRateState from "../../models/shipmentRateState.model.js";

export const shipmentRateStateCsvFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(new ApiError(400, "No CSV file uploaded"));
    }

    const filePath = req.file.path;
    const updatedShipmentRateState = [];
    let documentsProcessedCount = 0;
    const promises = [];

    const stream = fs.createReadStream(filePath).pipe(csvParser());

    stream.on("data", async (row) => {
      const {
        State: state,
        Postal: postal,
        "Shipment State Rate (SSSR)": shipment_state_rate,
        "Shipment Delivery Message": shipment_delivery_message,
        "State Code": state_code,
      } = row;

      try {
        // Parse the numeric value without the "$" symbol
        const parsedSSR = parseFloat(shipment_state_rate.replace("$", ""));

        const filter = { state_code };
        const update = {
          $set: {
            state,
            postal,
            shipment_state_rate: isNaN(parsedSSR) ? 0 : parsedSSR,
            shipment_delivery_message,
            state_code,
          },
        };
        const options = { upsert: true, new: true };

        const promise = ShipmentRateState.findOneAndUpdate(
          filter,
          update,
          options
        )
          .then((updatedData) => {
            if (!updatedData) {
              return ShipmentRateState.create({
                state,
                postal,
                shipment_state_rate: isNaN(parsedSSR) ? 0 : parsedSSR,
                shipment_delivery_message,
                state_code,
              });
            }
            return updatedData;
          })
          .then((result) => {
            updatedShipmentRateState.push(result);
            documentsProcessedCount++;
          })
          .catch((updateError) => {
            console.error(
              `Error updating/inserting document with State Code ${state_code}: ${updateError.message}`
            );
          });

        promises.push(promise);
      } catch (updateError) {
        console.error(
          `Error updating/inserting document with State Code ${state_code}: ${updateError.message}`
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
              updatedShipmentRateState,
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

export const getShipmentRateState = async (req, res) => {
  try {
    const getData = await ShipmentRateState.find();
    return res.json(
      new ApiResponse(200, getData, "Get shipment rate state successfully.")
    );
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};
