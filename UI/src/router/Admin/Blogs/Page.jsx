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
  CardMedia,
} from "@mui/material";
import Button from "@mui/material/Button";
import AddBlog from "./AddBlog";

const Page = () => {
  const [blogs, setBlogs] = useState(null);
  /* 
  This below is the data structure of the reviews array:

    _id: mongoose ObjectID
    image: string
    content: html string
    updatedAt: ISO Date string
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
          setBlogs(data.data[0].blog);
          console.log(data.data[0].blog);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchReviews();
  }, []);

  if (!blogs) return <Loader />;

  return (
    <Switch>
      <Route path={match.path + "/new"}>
        <AddBlog />
      </Route>
      <Route path={match.path}>
        <div className="w-full py-2 flex justify-between items-center flex-row mb-3">
          <div>
            <h1 className="text-3xl font-medium">Blogs</h1>
          </div>
          <div>
            <Link to={match.path + "/new"}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                className="whitespace-nowrap w-max text-white !p-3 !bg-indigo-500 hover:!bg-indigo-600 !rounded-md"
              >
                New Blog
              </Button>
            </Link>
          </div>
        </div>

        <Grid container spacing={2}>
          {blogs.map((blog, index) => (
            <Grid item xs={12} lg={6} xl={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={"/api" + blog.image}
                  alt="blog image"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(blog.updatedAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {blog.content}
                  </Typography>
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

// /blog_image-1703419759494-146402194.png
