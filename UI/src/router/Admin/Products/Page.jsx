import Loader from "@/components/Loader";
import { Grid, Paper, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { Add as AddIcon } from "@mui/icons-material";
import AddProduct from "./AddProduct";

const Page = () => {
  const [products, setProducts] = useState([]);
  const match = useRouteMatch();

  useEffect(() => {
    fetch("/api/api/v1/products/get-product?limit=40")
      .then((res) => res.json())
      .then(({ data }) => {
        setProducts(data.docs);
      });
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (products.length === 0) return <Loader />;

  function addToBestSeller(id) {
    fetch(`/api/api/v1/products/update-product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        best_seller: true,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedProduct) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, best_seller: true } : product
          )
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <Switch>
      <Route path={match.path + "/new"}>
        <AddProduct />
      </Route>

      <Route path={match.path}>
        <div className="w-full py-2 flex justify-between items-center flex-row mb-3">
          <div>
            <h1 className="text-3xl font-medium">All Products</h1>
          </div>
          <div>
            <Link to={match.path + "/new"}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                className="whitespace-nowrap w-max text-white !p-3 !bg-indigo-500 hover:!bg-indigo-600 !rounded-md"
              >
                Add Product
              </Button>
            </Link>
          </div>
        </div>
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box height="100%" display="flex">
                <Paper
                  className={`w-full p-4 space-y-1 ${
                    product.best_seller &&
                    "!bg-indigo-50 !ring-2 ring-indigo-200"
                  } `}
                >
                  <img
                    src={`/api${product.images[0]}`}
                    className="w-full aspect-square object-cover rounded-md"
                  />

                  <h2 className="font-bold">{product.title}</h2>
                  <p>
                    <strong>Origin Country: </strong>
                    {product.country.name}
                  </p>
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
                    className="w-full text-white p-2 !bg-indigo-500 hover:!bg-indigo-600 rounded-md font-medium"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    className="w-full text-white p-2 !bg-indigo-500 hover:!bg-indigo-600 rounded-md font-medium"
                    onClick={() => addToBestSeller(product._id)}
                  >
                    Make best seller
                  </Button>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Route>
    </Switch>
  );
};

export default Page;
