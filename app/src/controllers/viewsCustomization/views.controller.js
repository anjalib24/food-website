import { asyncHandler } from "../../utils/asyncHandler.js";
import { ViewsCustomise } from "../../models/viewsCustomise.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { viewsCustomiseValidationSchema } from "../../utils/Validation.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const createViews = asyncHandler(async (req, res) => {
  const hero_section_image =
    (req.files["hero_section_image"] &&
      req.files["hero_section_image"][0].filename) ||
    "";

  const reviews_image =
    (req.files["reviews_image"] && req.files["reviews_image"][0].filename) ||
    "";

  const about_us_image =
    (req.files["about_us_image"] && req.files["about_us_image"][0].filename) ||
    "";

  const about_us_video =
    (req.files["about_us_video"] && req.files["about_us_video"][0].filename) ||
    "";

  const blog_image =
    (req.files["blog_image"] && req.files["blog_image"][0].filename) || "";

  const logo = (req.files["logo"] && req.files["logo"][0].filename) || "";

  if (!hero_section_image) {
    throw new ApiError(400, "Hero section image is required!");
  }

  if (!reviews_image) {
    throw new ApiError(400, "Reviews image is required!");
  }

  if (!about_us_image) {
    throw new ApiError(400, "About us image is required!");
  }

  if (!about_us_video) {
    throw new ApiError(400, "About use video is required!");
  }

  if (!blog_image) {
    throw new ApiError(400, "Blog image is required!");
  }

  if (!logo) {
    throw new ApiError(400, "logo is required!");
  }

  const viewsObject = {
    hero_section: {
      title: "Welcome to Our Website",
      subtitle: "Explore the Amazing Features",
      image: `/images/${hero_section_image}`,
    },
    about_us: {
      text: "Learn more about our company...",
      video: `/videos/${about_us_video}`,
      image: `/images/${about_us_image}`,
    },
    reviews: {
      name: "John Doe",
      image: `/images/${reviews_image}`,
      reviews: "Excellent service!...",
      rating: "5",
    },
    blog: {
      image: `/images/${blog_image}`,
      content: "Lorem ipsum dolor sit amet...",
      published: true,
    },
    faq: {
      question: "What are your hours of operation?",
      answer: "We are open Monday to Friday from 9 am to 5 pm.",
    },
    logo: `/logo/${logo}`,
  };

  const { error } = viewsCustomiseValidationSchema.validate(viewsObject);

  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const newViewsCustomise = await ViewsCustomise.create(viewsObject);

  if (!newViewsCustomise) {
    throw new ApiError(
      500,
      "Something went wrong while creating views customise section data"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        newViewsCustomise,
        "Views customise created successfully"
      )
    );
});

export { createViews };
