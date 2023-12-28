import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Grid, Paper, Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import Loader from "@/components/Loader";

const Page = () => {
  const match = useRouteMatch();
  const [bestSellers, setBestSellers] = useState(null);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(
          "/api/api/v1/products/get-best-seller-product"
        );

        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }

        const { data } = await result.json();
        console.log(data);
        setBestSellers(data);
      } catch (e) {
        console.error("Error:", e);
      }
    }

    fetchData();
  }, []);

  function rmFromBestSeller(id) {
    fetch(`/api/api/v1/products/update-product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        best_seller: false,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedProduct) => {
        setBestSellers((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (!bestSellers) return <Loader />;
  return (
    <>
      <div className="w-full py-2 flex justify-between items-center flex-row mb-3">
        <div>
          <h1 className="text-3xl font-medium">Best seller products</h1>
        </div>
        <div>
          <p className="text-xl">{bestSellers.length} Products</p>
        </div>
      </div>
      <Grid container spacing={2}>
        {bestSellers.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box height="100%" display="flex">
              <Paper
                className={`w-full p-4 space-y-1 ${
                  product.best_seller && "!bg-indigo-50 !ring-2 ring-indigo-200"
                } `}
              >
                <img
                  src={`/api${product.images[0]}`}
                  className="w-full aspect-square object-cover rounded-md"
                />

                <h2 className="font-bold">{product.title}</h2>

                <p>
                  <strong>Price: </strong>
                  {formatter.format(product.price)}
                </p>
                <p>
                  <strong>Category: </strong>
                  {product.category.name}
                </p>

                <Button
                  variant="contained"
                  className="w-full text-white p-2 !bg-red-500 hover:!bg-red-600 rounded-md font-medium"
                  onClick={() => rmFromBestSeller(product._id)}
                >
                  Remove best seller
                </Button>
              </Paper>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Page;