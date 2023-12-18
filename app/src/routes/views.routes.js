import { Router } from "express";
import {
  createViews,
  getViews,
  updateAboutUs,
  updateBlog,
  updateFAQ,
  updateHeroSection,
  updateLogo,
  updateReviews,
} from "../controllers/viewsCustomization/views.controller.js";
import { upload } from "../middlewares/uploadMediaFile.js";

const router = Router();

router.route("/create-views").post(
  upload.fields([
    { name: "hero_section_image", maxCount: 1 },
    { name: "reviews_image", maxCount: 1 },
    { name: "about_us_image", maxCount: 1 },
    { name: "blog_image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "about_us_video", maxCount: 1 },
  ]),
  createViews
);

router.route("/get-views").get(getViews);

router
  .route("/update-hero-section-views/:id")
  .put(
    upload.fields([{ name: "hero_section_image", maxCount: 1 }]),
    updateHeroSection
  );

router
  .route("/update-reviews-views/:id")
  .put(upload.fields([{ name: "reviews_image", maxCount: 1 }]), updateReviews);

router.route("/update-about-us/:id").put(
  upload.fields([
    { name: "about_us_image", maxCount: 1 },
    { name: "about_us_video", maxCount: 1 },
  ]),
  updateAboutUs
);

router
  .route("/update-blog-views/:id")
  .put(upload.fields([{ name: "blog_image", maxCount: 1 }]), updateBlog);

router.route("/update-faq-views/:id").put(updateFAQ);

router
  .route("/update-logo-views/:id")
  .put(upload.fields([{ name: "logo", maxCount: 1 }]), updateLogo);

export default router;
