import Loader from "@/components/Loader";
import { Grid, Paper, Box } from "@mui/material";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/api/v1/products/get-product")
      .then((res) => res.json())
      .then(({ data }) => {
        // console.log(data.images);
        data.docs.forEach((doc, i) => {
          data.docs[i].images = data.docs[i].images.map(
            (img) => img.split("public")[1]
          );
        });
        setProducts(data.docs);
      });
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (products.length === 0) return <Loader />;

  return (
    <>
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
                  {product.category}
                </p>
              </Paper>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Page;
