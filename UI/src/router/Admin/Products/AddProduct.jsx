import Editor from "@/components/Editor";
import { useAdminState } from "@/contexts/AdminContext";
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
import { useEffect, useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    short_description: "",
    description: "",
    origin_country: "",
    images: [],
    price: "",
    video: "",
    zipFile: "",
    expiry_date: "",
    promotion_code: "",
    rank: "",
    best_seller: false,
    categoryID: "",
    weight: ""
  });

  const { countries, categories } = useAdminState();

  const handleImageChange = (event) => {
    setProduct((product) => ({
      ...product,
      images: [...event.target.files],
    }));
  };

  const handleChange = (event) => {
    if (typeof event === "string") {
      setProduct({
        ...product,
        description: event,
      });
      return;
    }
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === "images") {
        product[key].forEach((img, ind) => {
          formData.append(`images`, img);
        });
      } else {
        formData.append(key, product[key]);
      }
    });

    try {
      const response = await fetch(
        import.meta.env.VITE_APP_BASE_API + "/api/v1/products/create-product",
        {
          method: "POST",
          body: formData,
        }
      );
      setProduct("")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  function temp(argv) {
    console.log(argv);
  }

  return (
    <Paper className="w-full p-4 space-y-1">
      <Typography variant="h5" gutterBottom marginBottom={"20px"}>
        Create New Products
      </Typography>

      <form onSubmit={handleSubmit} className="!my-4">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="title"
              label="Title"
              value={product.title}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="origin_country-label" className="bg-white">
                Origin Country
              </InputLabel>
              <Select
                labelId="origin_country-label"
                id="origin_country"
                name="origin_country"
                value={product.origin_country}
                onChange={handleChange}
              >
                {countries?.map((country, index) => (
                  <MenuItem key={index} value={country._id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="short_description"
              label="Short Description"
              value={product.short_description}
              onChange={handleChange}
              multiline
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              multiline
              value={product.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid> */}
          <Grid item xs={12}>
            <Box
              component={Editor}
              content={product.description}
              setContent={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="price"
              label="Price"
              value={product.price}
              onChange={handleChange}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="promotion_code"
              label="Promotion Code"
              value={product.promotion_code}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="video"
              label="Video"
              // value={product.video}
              type="file"
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, video: e.target.files[0] }))
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: "video/*" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="expiry_date"
              label="Expiry Date"
              value={product.expiry_date}
              type="date"
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="images"
              label="Images"
              type="file"
              onChange={handleImageChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: "image/*", multiple: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="categoryID-label" className="bg-white">
                Category
              </InputLabel>
              <Select
                labelId="categoryID-label"
                id="categoryID"
                name="categoryID"
                value={product.categoryID}
                onChange={handleChange}
              >
                {categories?.map((category, index) => (
                  <MenuItem key={index} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {product?.images?.length > 0 && (
            <Grid item xs={12}>
              <Grid container gap={2}>
                {Array.from(product.images).map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index}`}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                ))}
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <TextField
              name="weight"
              label="Weight"
              value={product.weight}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="zipFile"
              label="360 Zip File"
              type="file"
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, zipFile: e.target.files[0] }))
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: ".zip" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="rank"
              label="Rank"
              value={product.rank}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="best_seller-label" className="bg-white">
                Best Seller
              </InputLabel>
              <Select
                labelId="best_seller-label"
                id="best_seller"
                name="best_seller"
                value={product.best_seller}
                onChange={handleChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

       
        </Grid>
        <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
      </form>
    </Paper>
  );
};

export default AddProduct;
