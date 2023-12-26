import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

const Logo = ({ data }) => {
  const [logo, setLogo] = useState(null);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if logo is selected
    if (!logo) {
      alert("Please select a logo");
      return;
    }

    const formData = new FormData();
    formData.append("logo", logo);

    fetch("/api/api/v1/views/update-logo-views", {
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
    // Handle form submission here
  };

  const img = logo || data;

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        name="image"
        label="Image"
        type="file"
        onChange={(e) => handleLogoChange(e)}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{ accept: "image/*" }}
      />
      {img && (
        <Box
          component={"img"}
          src={img == data ? "/api" + img : URL.createObjectURL(img)}
          alt={`Logo`}
          className="h-56 object-cover rounded-md"
          sx={{ mt: 1 }}
        />
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default Logo;
