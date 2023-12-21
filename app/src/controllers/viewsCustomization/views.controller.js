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
    reviews_age,
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
    reviews: [
      {
        name: reviews_name,
        age: reviews_age,
        image: `/images/${reviews_image}`,
        reviews: reviews,
        rating: reviews_rating,
      },
    ],
    blog: [
      {
        image: `/images/${blog_image}`,
        content: blog_content,
        published: blog_published,
      },
    ],
    faq: [
      {
        question: faq_question,
        answer: faq_answer,
      },
    ],
    logo: `/logo/${logo}`,
  };

  // const { error } = viewsCustomiseValidationSchema.validate(viewsObject);

  // if (error) {
  //   throw new ApiError(400, error.details[0].message);
  // }

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

  const hero_section_image =
    (req.files["hero_section_image"] &&
      req.files["hero_section_image"][0].filename) ||
    "";

  let heroSectionAttribute = {};

  if (title) {
    heroSectionAttribute = {
      ...heroSectionAttribute,
      "hero_section.title": title,
    };
  }

  if (subtitle) {
    heroSectionAttribute = {
      ...heroSectionAttribute,
      "hero_section.subtitle": subtitle,
    };
  }

  if (hero_section_image) {
    heroSectionAttribute = {
      ...heroSectionAttribute,
      "hero_section.image": `/images/${hero_section_image}`,
    };
  }

  const updateViewsCustomise = await ViewsCustomise.findOneAndUpdate(
    {},
    {
      $set: heroSectionAttribute,
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

//---------------------create reviews section------------------------
const createReviews = asyncHandler(async (req, res) => {
  const { name, age, reviews, rating } = req.body;

  const reviews_image =
    (req.files["reviews_image"] && req.files["reviews_image"][0].filename) ||
    "";

  if (!name) {
    throw new ApiError(400, "name is required!");
  }

  if (!age) {
    throw new ApiError(400, "age is required!");
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

  const createReview = await ViewsCustomise.findOneAndUpdate(
    {},
    {
      $push: {
        reviews: {
          name: name,
          age: age,
          reviews: reviews,
          rating: rating,
          image: `/images/${reviews_image}`,
        },
      },
    },
    { new: true }
  );

  if (!createReview) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Reviews not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createReview, "Reviews updated successfully"));
});

//---------------------update reviews section------------------------
const updateReviews = asyncHandler(async (req, res) => {
  const { name, age, reviews, rating } = req.body;
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

  if (!age) {
    throw new ApiError(400, "age is required!");
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

  const updateReviews = await ViewsCustomise.findOneAndUpdate(
    {
      "reviews._id": id,
    },
    {
      $set: {
        "reviews.$[review].name": name,
        "reviews.$[review].age": age,
        "reviews.$[review].reviews": reviews,
        "reviews.$[review].rating": rating,
        "reviews.$[review].image": `/images/${reviews_image}`,
      },
    },
    {
      arrayFilters: [{ "review._id": id }],
      new: true,
    }
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

  const about_us_image =
    (req.files["about_us_image"] && req.files["about_us_image"][0].filename) ||
    "";

  const about_us_video =
    (req.files["about_us_video"] && req.files["about_us_video"][0].filename) ||
    "";

  if (!text) {
    throw new ApiError(400, "text is required!");
  }

  if (!about_us_image) {
    throw new ApiError(400, "About us image is required!");
  }

  if (!about_us_video) {
    throw new ApiError(400, "About us video is required!");
  }

  const updateReviews = await ViewsCustomise.findOneAndUpdate(
    {},
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
      .json(new ApiResponse(404, null, "About us not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateReviews, "About us updated successfully"));
});

// ------------------------create blog------------------
const createBlog = asyncHandler(async (req, res) => {
  const { content, published = false } = req.body;

  const blog_image =
    (req.files["blog_image"] && req.files["blog_image"][0].filename) || "";

  if (!content) {
    throw new ApiError(400, "content is required!");
  }

  if (!blog_image) {
    throw new ApiError(400, "Blog image is required!");
  }

  const createBlog = await ViewsCustomise.findOneAndUpdate(
    {},
    {
      $push: {
        blog: {
          content: content,
          published: published,
          image: `/images/${blog_image}`,
        },
      },
    },
    { new: true }
  );

  if (!createBlog) {
    return res.status(404).json(new ApiResponse(404, null, "blog not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createBlog, "blog create successfully"));
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

  const updateBlog = await ViewsCustomise.findOneAndUpdate(
    {
      "blog._id": id,
    },
    {
      $set: {
        "blog.$[blog].content": content,
        "blog.$[blog].published": published,
        "blog.$[blog].image": `/images/${blog_image}`,
      },
    },
    {
      arrayFilters: [{ "blog._id": id }],
      new: true,
    }
  );

  if (!updateBlog) {
    return res.status(404).json(new ApiResponse(404, null, "blog not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateBlog, "blog updated successfully"));
});

//---------------------create FAQ section------------------------
const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;

  if (!question) {
    throw new ApiError(400, "Question is required!");
  }

  if (!answer) {
    throw new ApiError(400, "Answer is required!");
  }

  const createFAQ = await ViewsCustomise.findOneAndUpdate(
    {},
    {
      $push: {
        faq: {
          question: question,
          answer: answer,
        },
      },
    },
    { new: true }
  );

  if (!createFAQ) {
    return res.status(404).json(new ApiResponse(404, null, "faq not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createFAQ, "faq updated successfully"));
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

  const updateFAQ = await ViewsCustomise.findOneAndUpdate(
    {
      "faq._id": id,
    },
    {
      $set: {
        "faq.$[faq].question": question,
        "faq.$[faq].answer": answer,
      },
    },
    {
      arrayFilters: [{ "faq._id": id }],
      new: true,
    }
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

  const logo = (req.files["logo"] && req.files["logo"][0].filename) || "";

  if (!logo) {
    throw new ApiError(400, "logo is required!");
  }

  const updateLogo = await ViewsCustomise.findOneAndUpdate(
    {},
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
  createBlog,
  createFAQ,
  createReviews,
};
