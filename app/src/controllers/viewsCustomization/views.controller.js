import { asyncHandler } from "../../utils/asyncHandler.js";
import { ViewsCustomise } from "../../models/viewsCustomise.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { viewsCustomiseValidationSchema } from "../../utils/Validation.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

//------------------create views page---------------
const createViews = asyncHandler(async (req, res) => {
  const {
    hero_section_title,
    hero_section_subtitle,
    about_us_text,
    reviews_name,
    reviews_rating,
    reviews,
    blog_content,
    blog_published,
    faq_question,
    faq_answer,
  } = req.body;

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
      title: hero_section_title,
      subtitle: hero_section_subtitle,
      image: `/images/${hero_section_image}`,
    },
    about_us: {
      text: about_us_text,
      video: `/videos/${about_us_video}`,
      image: `/images/${about_us_image}`,
    },
    reviews: {
      name: reviews_name,
      image: `/images/${reviews_image}`,
      reviews: reviews,
      rating: reviews_rating,
    },
    blog: {
      image: `/images/${blog_image}`,
      content: blog_content,
      published: blog_published,
    },
    faq: {
      question: faq_question,
      answer: faq_answer,
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

//---------------------get view page------------------------
const getViews = asyncHandler(async (req, res) => {
  const getViewsCustomise = await ViewsCustomise.find();

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        getViewsCustomise,
        "Views customise data get successfully"
      )
    );
});

//---------------------update hero section------------------------
const updateHeroSection = asyncHandler(async (req, res) => {
  const { title, subtitle } = req.body;
  const { id } = req.params;

  const hero_section_image =
    (req.files["hero_section_image"] &&
      req.files["hero_section_image"][0].filename) ||
    "";

  if (!id) {
    throw new ApiError(400, "id is required!");
  }

  if (!title) {
    throw new ApiError(400, "Title is required!");
  }

  if (!subtitle) {
    throw new ApiError(400, "Subtitle is required!");
  }

  if (!hero_section_image) {
    throw new ApiError(400, "Hero section image is required!");
  }

  const updateViewsCustomise = await ViewsCustomise.findByIdAndUpdate(
    id,
    {
      $set: {
        "hero_section.title": title,
        "hero_section.subtitle": subtitle,
        "hero_section.image": `/images${hero_section_image}`,
      },
    },
    { new: true }
  );

  if (!updateViewsCustomise) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Hero section not found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateViewsCustomise,
        "Hero section updated successfully"
      )
    );
});

//---------------------update reviews section------------------------
const updateReviews = asyncHandler(async (req, res) => {
  const { name, reviews, rating } = req.body;
  const { id } = req.params;

  const reviews_image =
    (req.files["reviews_image"] && req.files["reviews_image"][0].filename) ||
    "";

  if (!id) {
    throw new ApiError(400, "id is required!");
  }

  if (!name) {
    throw new ApiError(400, "name is required!");
  }

  if (!reviews) {
    throw new ApiError(400, "reviews is required!");
  }

  if (!rating) {
    throw new ApiError(400, "rating is required!");
  }

  if (!reviews_image) {
    throw new ApiError(400, "Reviews image is required!");
  }

  const updateReviews = await ViewsCustomise.findByIdAndUpdate(
    id,
    {
      $set: {
        "reviews.name": name,
        "reviews.reviews": reviews,
        "reviews.rating": rating,
        "reviews.image": `/images/${reviews_image}`,
      },
    },
    { new: true }
  );

  if (!updateReviews) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Reviews not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateReviews, "Reviews updated successfully"));
});

//---------------------update about us section------------------------
const updateAboutUs = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;

  const about_us_image =
    (req.files["about_us_image"] && req.files["about_us_image"][0].filename) ||
    "";

  const about_us_video =
    (req.files["about_us_video"] && req.files["about_us_video"][0].filename) ||
    "";

  if (!id) {
    throw new ApiError(400, "id is required!");
  }

  if (!text) {
    throw new ApiError(400, "text is required!");
  }

  if (!about_us_image) {
    throw new ApiError(400, "About us image is required!");
  }

  if (!about_us_video) {
    throw new ApiError(400, "About us video is required!");
  }

  const updateReviews = await ViewsCustomise.findByIdAndUpdate(
    id,
    {
      $set: {
        "about_us.text": text,
        "about_us.video": `/videos/${about_us_video}`,
        "about_us.image": `/images/${about_us_image}`,
      },
    },
    { new: true }
  );

  if (!updateReviews) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Reviews not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateReviews, "Reviews updated successfully"));
});

//---------------------update blog section------------------------
const updateBlog = asyncHandler(async (req, res) => {
  const { content, published = false } = req.body;
  const { id } = req.params;

  const blog_image =
    (req.files["blog_image"] && req.files["blog_image"][0].filename) || "";

  if (!id) {
    throw new ApiError(400, "id is required!");
  }

  if (!content) {
    throw new ApiError(400, "content is required!");
  }

  if (!blog_image) {
    throw new ApiError(400, "Blog image is required!");
  }

  const updateBlog = await ViewsCustomise.findByIdAndUpdate(
    id,
    {
      $set: {
        "blog.content": content,
        "blog.published": published,
        "blog.image": `/images/${blog_image}`,
      },
    },
    { new: true }
  );

  if (!updateBlog) {
    return res.status(404).json(new ApiResponse(404, null, "blog not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateBlog, "blog updated successfully"));
});

//---------------------update FAQ section------------------------
const updateFAQ = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;

  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "id is required!");
  }

  if (!question) {
    throw new ApiError(400, "Question is required!");
  }

  if (!answer) {
    throw new ApiError(400, "Answer is required!");
  }

  const updateFAQ = await ViewsCustomise.findByIdAndUpdate(
    id,
    {
      $set: {
        "faq.question": question,
        "faq.answer": answer,
      },
    },
    { new: true }
  );

  if (!updateFAQ) {
    return res.status(404).json(new ApiResponse(404, null, "faq not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateFAQ, "faq updated successfully"));
});

//---------------------update FAQ section------------------------
const updateLogo = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  const { id } = req.params;

  const logo = (req.files["logo"] && req.files["logo"][0].filename) || "";

  if (!id) {
    throw new ApiError(400, "id is required!");
  }

  if (!logo) {
    throw new ApiError(400, "logo is required!");
  }

  const updateLogo = await ViewsCustomise.findByIdAndUpdate(
    id,
    {
      $set: {
        logo: `/logo/${logo}`,
      },
    },
    { new: true }
  );

  if (!updateLogo) {
    return res.status(404).json(new ApiResponse(404, null, "logo not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateLogo, "logo updated successfully"));
});

export {
  createViews,
  getViews,
  updateHeroSection,
  updateReviews,
  updateAboutUs,
  updateBlog,
  updateFAQ,
  updateLogo,
};
