import Loader from "@/components/Loader";
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, Route, useRouteMatch, Switch } from "react-router-dom";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Button from "@mui/material/Button";
import AddReview from "./AddFAQs";

const Page = () => {
  const [faqs, setFaqs] = useState();
  /* 
  This below is the data structure of the faqs array:
    question: String
    answer: String
    _id: "6583e4eba0a5a59cfe8243ce"
   */

  const match = useRouteMatch();

  useEffect(() => {
    const fetchReviews = () => {
      fetch("/api/api/v1/views/get-views")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setFaqs(data.data[0].faq);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchReviews();
  }, []);

  if (!faqs) return <Loader />;

  return (
    <Switch>
      <Route path={match.path + "/new"}>
        <AddReview />
      </Route>
      <Route path={match.path}>
        <div className="w-full py-2 flex justify-between items-center flex-row mb-3">
          <div>
            <h1 className="text-3xl font-medium">Frequently asked questions</h1>
          </div>
          <div>
            <Link to={match.path + "/new"}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                className="whitespace-nowrap w-max text-white !p-3 !bg-indigo-500 hover:!bg-indigo-600 !rounded-md"
              >
                New FAQ
              </Button>
            </Link>
          </div>
        </div>

        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ margin: "20px 0" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Route>
    </Switch>
  );
};

export default Page;
