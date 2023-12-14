import Loader from "@/components/Loader";
import { Grid, Paper, Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import { Add as AddIcon } from "@mui/icons-material";
import AddProduct from "./AddProduct";

const Page = () => {
  const [products, setProducts] = useState([]);
  const match = useRouteMatch();
  console.log(match);

  useEffect(() => {
    fetch("/api/api/v1/products/get-product")
      .then((res) => res.json())
      .then(({ data }) => {
        data.docs.forEach((doc, i) => {
          data.docs[i].images = data.docs[i].images.map((img) => {
            return img.split("public")[1];
          });
        });
        console.log(data.docs);
        setProducts(data.docs);
      });
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (products.length === 0) return <Loader />;

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
              <button className="whitespace-nowrap w-max text-white p-2 bg-indigo-500 hover:bg-indigo-600 rounded-md">
                <AddIcon className="inline" /> Add Product
              </button>
            </Link>
          </div>
        </div>
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box height="100%" display="flex">
                <Paper className="w-full p-4 space-y-1">
                  <img
                    src={`/api${product.images[0]}`}
                    className="w-full aspect-square object-cover rounded-md"
                  />

                  <h2 className="font-bold">{product.title}</h2>
                  <p>
                    <strong>Origin Country: </strong>
                    {product.origin_country}
                  </p>
                  <p>
                    <strong>Price: </strong>
                    {formatter.format(product.price)}
                  </p>
                  <p>
                    <strong>Category: </strong>
                    {product.category.name}
                  </p>
                  <button className="w-full text-white p-2 bg-indigo-500 hover:bg-indigo-600 rounded-md">
                    Edit
                  </button>
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
