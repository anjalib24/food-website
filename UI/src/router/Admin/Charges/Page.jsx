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
  const [benchmark, setBenchmark] = useState("");
  const [benchmark1, setBenchmark1] = useState("");
  const [fixedShippingCharge, setFixedShippingCharge] = useState("");

  const [zipCodes, setZipCodes] = useState([]);
  const [newZipCode, setNewZipCode] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/benchmarks")
      .then((response) => response.json())
      .then((data) => {
        const marks = data.data[0];
        setBenchmark(marks.benchmark);
        setBenchmark1(marks.benchmark1);
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

    fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/free-zip-codes")
      .then((response) => response.json())
      .then((data) => {
        setZipCodes(data.data);
      })
      .catch((error) => {
        console.error("Error fetching free zip codes:", error);
      });
  }, []);

  const addZipCode = () => {
    if (/^\d+$/.test(newZipCode)) {
      fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/free-zip-codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zipCode: newZipCode }),
      })
        .then((response) => response.json())
        .then(({ data }) => {
          setZipCodes([...zipCodes, data]);
          setNewZipCode("");
        })
        .catch((error) => {
          console.error("Error creating zip code:", error);
        });
    } else {
      alert("Please enter a valid 5-digit zip code.");
    }
  };

  const deleteZipCode = (zipId) => {
    fetch(
      import.meta.env.VITE_APP_BASE_API + "/api/v1/free-zip-codes/" + zipId,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setZipCodes(zipCodes.filter((zipCode) => zipCode._id !== zipId));
      });
  };

  const updateBenchmark = () => {
    fetch(import.meta.env.VITE_APP_BASE_API + "/api/v1/benchmarks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ benchmark: benchmark, benchmark1: benchmark1 }),
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setBenchmark(data.benchmark);
        setBenchmark1(data.benchmark1);
      })
      .catch((error) => {
        console.error("Error updating benchmarks:", error);
      });
  };

  const updateFixedShippingCharge = () => {
    console.log("Updating fixed shipping charge...");
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
          id="benchmark"
          label="Benchmark 1"
          name="benchmark"
          type="number"
          value={benchmark}
          onChange={(e) => setBenchmark(e.target.value)}
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
          id="benchmark1"
          label="Benchmark 2"
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

      <Paper style={{ width: "100%", padding: "16px" }}>
        <Typography variant="h5">Zip Codes</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="newZipCode"
          label="New Zip Code"
          name="newZipCode"
          type="number"
          value={newZipCode}
          onChange={(e) => setNewZipCode(e.target.value)}
        />
        <Button
          variant="contained"
          className="!bg-indigo-500 hover:!bg-indigo-600 text-white mt-2"
          onClick={addZipCode}
        >
          Add Zip Code
        </Button>
        <Grid container spacing={1.5} mt={1}>
          {zipCodes.map(({ _id, zipCode }, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={1}
                style={{
                  padding: "12px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="p" fontWeight={"bold"}>
                  {zipCode}
                </Typography>
                <IconButton
                  edge="start"
                  aria-label="delete"
                  onClick={() => deleteZipCode(_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Page;
