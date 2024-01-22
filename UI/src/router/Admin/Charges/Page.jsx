import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

const Page = () => {
  const [benchmark1, setBenchmark1] = useState("");
  const [benchmark2, setBenchmark2] = useState("");
  const [fixedShippingCharge, setFixedShippingCharge] = useState("");


  useEffect(() => {
    fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/benchmarks")
       .then((response) => response.json())
       .then((data) => {
         const marks = data.data[0];
         console.log(marks,"marrrr");
         setBenchmark1(marks.benchmark1);
         setBenchmark2(marks.benchmark2);
       })
       .catch((error) => {
         console.error("Error fetching benchmarks:", error);
       });
   
    fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/fixed-shipping-prices")
       .then((response) => response.json())
       .then((data) => {
         const charge = data.data[0];
         setFixedShippingCharge(charge.fixed_shipping_price);
       });
   }, []);

  const updateBenchmark = () => {
    fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/benchmarks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ benchmark1: benchmark1, benchmark2: benchmark2 }),
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setBenchmark1(data.benchmark1);
        setBenchmark2(data.benchmark2);
      })
      .catch((error) => {
        console.error("Error updating benchmarks:", error);
      });
  };

  const updateFixedShippingCharge = () => {
    fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/fixed-shipping-prices", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fixed_shipping_price: fixedShippingCharge,
      }),
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setFixedShippingCharge(data.fixed_shipping_price);
      })
      .catch((error) => {
        console.error("Error updating fixed shipping charge:", error);
      });
  };

  return (
    <Box display="flex" flexDirection="column" rowGap={4}>
      <Paper style={{ width: "100%", padding: "16px" }}>
        <Typography variant="h5">Benchmark 1</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="benchmark1"
          label="Benchmark 1"
          name="benchmark1"
          type="number"
          value={benchmark1}
          onChange={(e) => setBenchmark1(e.target.value)}
        />
        <Button
          variant="contained"
          className="!bg-indigo-500 hover:!bg-indigo-600 text-white mt-2"
          onClick={updateBenchmark}
        >
          Update
        </Button>
      </Paper>

      <Paper style={{ width: "100%", padding: "16px" }}>
        <Typography variant="h5">Benchmark 2</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="benchmark2"
          label="Benchmark 2"
          name="benchmark2"
          type="number"
          value={benchmark2}
          onChange={(e) => setBenchmark2(e.target.value)}
        />
        <Button
          variant="contained"
          className="!bg-indigo-500 hover:!bg-indigo-600 text-white mt-2"
          onClick={updateBenchmark}
        >
          Update
        </Button>
      </Paper>

      <Paper style={{ width: "100%", padding: "16px" }}>
        <Typography variant="h5">Fixed Shipping Charge</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="fixedShippingCharge"
          label="Fixed Shipping Charge"
          name="fixedShippingCharge"
          type="number"
          value={fixedShippingCharge}
          onChange={(e) => setFixedShippingCharge(e.target.value)}
        />
        <Button
          variant="contained"
          className="!bg-indigo-500 hover:!bg-indigo-600 text-white mt-2"
          onClick={updateFixedShippingCharge}
        >
          Update
        </Button>
      </Paper>

    </Box>
  );
};

export default Page;
