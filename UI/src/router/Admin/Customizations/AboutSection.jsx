import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import Editor from "@/components/Editor";

const AboutSection = ({ data }) => {
  const [about, setAbout] = useState(data.text);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);

  const handleMediaChange = (e, func) => {
    func(e.target.files[0]);
  };

  const img = image || data.image;
  const vid = video || data.video;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here

    const formData = new FormData();

    if (image) formData.append("about_us_image", image);
    if (video) formData.append("about_us_video", video);
    formData.append("text", about);

    fetch("/api/api/v1/views/update-about-us", {
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

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {/* <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoFocus
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        multiline
      /> */}

      <Box component={Editor} content={about} setContent={setAbout} />
      <TextField
        margin="normal"
        name="image"
        label="Image"
        type="file"
        onChange={(e) => handleMediaChange(e, setImage)}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{ accept: "image/*" }}
      />
      {img && (
        <Box
          component={"img"}
          src={img == data.image ? "/api" + img : URL.createObjectURL(img)}
          alt={`image`}
          className="w-full object-cover rounded-md"
          sx={{ mt: 1 }}
        />
      )}

      <TextField
        margin="normal"
        name="video"
        label="Vedeo"
        type="file"
        onChange={(e) => handleMediaChange(e, setVideo)}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        inputProps={{ accept: "video/*" }}
      />

      {/* Videos */}
      {vid && (
        <Box sx={{ mt: 1 }}>
          <video className="w-full object-cover rounded-md" controls>
            <source
              src={vid == data.video ? "/api" + vid : URL.createObjectURL(vid)}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>
      )}

      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default AboutSection;
