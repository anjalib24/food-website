import { Router } from "express";
import { createViews } from "../controllers/viewsCustomization/views.controller.js";
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

export default router;
