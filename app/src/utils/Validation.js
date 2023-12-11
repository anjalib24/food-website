import Joi from "joi";

const userRegistrationValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirmPassword: Joi.string().required(),
});

const productValidation = Joi.object({
  title: Joi.string().required(),
  short_description: Joi.string().required(),
  description: Joi.string().required(),
  origin_country: Joi.string().required(),
  price: Joi.number().required(),
  expiry_date: Joi.date().required(),
  promotion_code: Joi.string().required(),
  rank: Joi.number().required(),
  category: Joi.string().required(),
});

export { userRegistrationValidation, productValidation };
