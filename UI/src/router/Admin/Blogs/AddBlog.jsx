import Editor from "@/components/Editor";
import {
  Button,
  TextField,
  Box,
  Rating,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";

const AddBlog = () => {
  const [blog, setBlog] = useState({
    blog_image: null,
    content: "",
    published: true,
  });

  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    console.log(event.target);
    setBlog((blog) => ({
      ...blog,
      blog_image: event.target.files[0],
    }));

    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Submit the review...
    console.log(blog);
    // return;
    const formData = new FormData();

    Object.keys(blog).forEach((key) => {
      formData.append(key, blog[key]);
    });

    try {
      const response = await fetch("/api/api/v1/views/create-blog-views", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper className="w-full p-4 space-y-1">
      <Typography variant="h5" gutterBottom marginBottom={"20px"}>
        Create New Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Write code here */}

          <Grid item xs={12}>
            <Box
              component={Editor}
              content={blog.content}
              setContent={(content) => setBlog({ ...blog, content })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="blog_image"
              label="Image"
              type="file"
              onChange={handleImageChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: "image/*" }}
            />
          </Grid>
          {preview && (
            <Grid item xs={6}>
              <Box
                sx={{
                  width: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={preview} alt="preview" />
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddBlog;
