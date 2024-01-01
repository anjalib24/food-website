import { useAdminState } from "@/contexts/AdminContext";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

const AddFaqs = () => {
  const [faq, setFaq] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (event) => {
    // complete this handler
    setFaq({
      ...faq,
      [event.target.name]: event.target.value,
    });
  };

  const { setFaqs } = useAdminState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Submit the review...
    console.log(faq);
    // return;

    try {
      const response = await fetch("/api/api/v1/views/create-faq-views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faq),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      console.log(data);

      setFaqs((prev) => [...prev, data.faq.at(-1)]);

      setFaq({
        question: "",
        answer: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper className="w-full p-4 space-y-1">
      <Typography variant="h5" gutterBottom marginBottom={"20px"}>
        Create New FAQS
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="question"
              label="Question"
              value={faq.question}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="answer"
              label="Answer"
              value={faq.answer}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

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

export default AddFaqs;
