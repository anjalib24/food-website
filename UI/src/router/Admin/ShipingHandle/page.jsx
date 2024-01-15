import { useEffect, useState } from "react";
import {
 Button,
 FormControl,
 Grid,
 InputLabel,
 MenuItem,
 Paper,
 Select,
 TextField,
 Typography,
 Box,
} from "@mui/material";

const Page = () => {

 const [ShipingRatesState, setShipingRatesState] = useState({
   csvFile: "",
 });
 const [dimensions, setDimensions] = useState({
  csvFile: "",
});
const [dimensionsWeightRange, setDimensionsWeightRange] = useState({
  csvFile: "",
});
const [freezipcode, setFreezipcode] = useState({
  csvFile: "",
});


 const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData();
    formData.append('csvFile', ShipingRatesState.csvFile);
    const response = await fetch("http://127.0.0.1:8000/api/v1/shipment-rate-state/csv-file-upload",
      {
        method: "POST",
        body: formData,
      }
    );
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
   } catch (error) {
    console.error(error);
   }
   
};


const handleDimensions = async (event) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    formData.append('csvFile', dimensions.csvFile);
    const response = await fetch("http://127.0.0.1:8000/api/v1/dimensions/csv-file-upload",
      {
        method: "POST",
        body: formData,
      }
    );
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
   } catch (error) {
    console.error(error);
   }
   
};


const handleDimensionsWeightRange = async (event) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    formData.append('csvFile', dimensionsWeightRange.csvFile);
    const response = await fetch("http://127.0.0.1:8000/api/v1/dimensions/csv-file-upload/dimension-weight-range",
      {
        method: "POST",
        body: formData,
      }
    );
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
   } catch (error) {
    console.error(error);
   }
   
};
const handleZipcode = async (event) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    formData.append('csvFile', dimensionsWeightRange.csvFile);
    const response = await fetch("http://127.0.0.1:8000/api/v1/free-zip-codes/csv-file-upload",
      {
        method: "POST",
        body: formData,
      }
    );
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
   } catch (error) {
    console.error(error);
   }
   
};

return (
<>
<Paper className="w-full p-4 space-y-1">
<Typography variant="h5" gutterBottom marginBottom={"20px"}>
        Add File for shiping charge
      </Typography>
      <form  onSubmit={handleSubmit}  className="!my-4 mt-5">
      <Grid container spacing={3}>

      <Grid item xs={12}>
            <TextField
              name="csvFile"
              label="Shiping-Rates_State"
              type="file"
              onChange={(e) =>
                setShipingRatesState((prev) => ({ ...prev, csvFile: e.target.files[0] }))
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: ".zip,.csv" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
      </Grid>
      </form>

      <form  onSubmit={handleDimensions}  className="!my-4 mt-5">
      <Grid container spacing={3}>
      <Grid item xs={12}>
            <TextField
              name="csvFile"
              label="Dimensions"
              type="file"
              onChange={(e) =>
                setDimensions((prev) => ({ ...prev, csvFile: e.target.files[0] }))

              }
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: ".csv" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
      </Grid>
      </form>

      <form  onSubmit={handleDimensionsWeightRange}  className="!my-4 mt-5">
      <Grid container spacing={3}>

      <Grid item xs={12}>
            <TextField
              name="csvFile"
              label="DimensionsWeightRange"
              type="file"
              onChange={(e) =>
                setDimensionsWeightRange((prev) => ({ ...prev, csvFile: e.target.files[0] }))
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: ".csv" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
      </Grid>
      
      </form>
      <form  onSubmit={handleZipcode}  className="!my-4 mt-5">

      <Grid container spacing={3}>

<Grid item xs={12}>
      <TextField
        name="csvFile"
        label="free-zip"
        type="file"
        onChange={(e) =>
          setFreezipcode((prev) => ({ ...prev, csvFile: e.target.files[0] }))
        }
        fullWidth
        InputLabelProps={{ shrink: true }}
        inputProps={{ accept: ".csv" }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Grid>
</Grid>
</form>

</Paper>

</>
    )
}

export default Page