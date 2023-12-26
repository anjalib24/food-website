import Loader from "@/components/Loader";
import { Add as AddIcon } from "@mui/icons-material";
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
} from "@mui/material";
import Button from "@mui/material/Button";
import AddReview from "./AddReview";

const Page = () => {
  const [reviews, setReviews] = useState(null);
  /* 
  This below is the data structure of the reviews array:
    age: 28
    image: "/images/reviews_image-1703155677760-624445842.jpeg"
    name: "Chandan Rajput"
    rating: 1
    reviews: "Ethnic food is a world of flavors, a celebration of cultural traditions on your plate. It's the taste of diverse cuisines, offering unique spices, ingredients, and cooking methods from around the glob.\nAt EthnicFoods.com, we bring you the most interesting, popular and adventurous foodsfrom around the World - from East to West,North to South of our great wonderful wide world!-----------------"
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
          setReviews(data.data[0].reviews);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchReviews();
  }, []);

  if (!reviews) return <Loader />;

  return (
    <Switch>
      <Route path={match.path + "/new"}>
        <AddReview />
      </Route>
      <Route path={match.path}>
        <div className="w-full py-2 flex justify-between items-center flex-row mb-3">
          <div>
            <h1 className="text-3xl font-medium">Customer Reviews</h1>
          </div>
          <div>
            <Link to={match.path + "/new"}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                className="whitespace-nowrap w-max text-white !p-3 !bg-indigo-500 hover:!bg-indigo-600 !rounded-md"
              >
                Add Review
              </Button>
            </Link>
          </div>
        </div>

        {/* create a material ui grid 3 columns on md and 4 columns on lg */}
        <Grid container spacing={2}>
          {reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent style={{ flex: "1 0 auto" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Avatar
                        alt={review.name}
                        src={review.image}
                        sx={{ width: 56, height: 56 }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h6">{review.name}</Typography>
                      <Rating name="read-only" value={review.rating} readOnly />
                    </Grid>
                  </Grid>
                  <Box mt={2}>
                    <Typography variant="body2">{review.reviews}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Route>
    </Switch>
  );
};

export default Page;
