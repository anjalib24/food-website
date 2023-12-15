import mongoose, { Schema } from "mongoose";

const viewsCustomiseSchema = new Schema(
  {
    hero_section: {
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },

    about_us: {
      text: {
        type: String,
        required: true,
      },
      video: {
        type: String,
      },

      image: {
        type: String,
        required: true,
      },
    },

    reviews: {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      reviews: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
    },

    blog: {
      image: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      published: {
        type: Boolean,
        required: true,
      },
    },

    faq: {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },

    logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ViewsCustomise = mongoose.model(
  "ViewsCustomise",
  viewsCustomiseSchema
);
