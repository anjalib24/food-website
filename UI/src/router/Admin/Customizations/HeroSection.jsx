import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, TextField, Box } from "@mui/material";

const HeroSection = ({ data }) => {
  const [title, setTitle] = useState(data.title);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // if (!title || !subtitle || !image) {
    //   alert("Please fill in all fields");
    //   return;
    // }
    console.log(title, subtitle, image);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    if (image) formData.append("hero_section_image", image);

    fetch("/api/api/v1/views/update-hero-section-views", {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const img = image || data.image;
  console.log(img, data.image);

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="subtitle"
        label="Subtitle"
        id="subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />
      <TextField
        margin="normal"
        name="image"
        label="Image"
        type="file"
        onChange={handleImageChange}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{ accept: "image/*" }}
      />

      {img && (
        <Box
          component={"img"}
          src={img == data.image ? "/api" + img : URL.createObjectURL(img)}
          alt={`Hero image`}
          className="h-56 object-cover rounded-md"
          sx={{ mt: 1 }}
        />
      )}
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default HeroSection;
