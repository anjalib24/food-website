import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import csvParser from "csv-parser";
import fs from "fs";
import Tax from "../../models/tax.model.js";

export const TaxCsvFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(new ApiError(400, "No CSV file uploaded"));
    }

    const filePath = req.file.path;

    const stream = fs.createReadStream(filePath).pipe(csvParser());
    const updatedTaxs = [];
    let documentsProcessedCount = 0;
    const promises = [];

    stream.on("data", (row) => {
      let { "State Code": stateCode, "State Tax Rate": stateTaxCode } = row;

      stateTaxCode =
        parseFloat(stateTaxCode.toString().replace("%", "")) || stateTaxCode;

      const filter = { state_code: stateCode };
      const update = {
        $set: { state_code: stateCode, state_tax_rate: stateTaxCode },
      };
      const options = { upsert: true, new: true };

      const promise = Tax.findOneAndUpdate(filter, update, options)
        .then((updatedTax) => {
          if (!updatedTax) {
            return Tax.create({
              state_code: stateCode,
              state_tax_rate: stateTaxCode,
            });
          }
          return updatedTax;
        })
        .then((result) => {
          updatedTaxs.push(result);
          documentsProcessedCount++;
        })
        .catch((updateError) => {
          console.error(
            `Error updating/inserting document with state Code ${stateCode}: ${updateError.message}`
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
              updatedTaxs,
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
