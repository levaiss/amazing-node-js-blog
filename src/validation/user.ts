import Joi from 'joi';

export const userSignUpSchema = Joi.object({
  username: Joi.string().min(3).max(24).required(),
  password: Joi.string().min(6).max(50).required(),
  email: Joi.string().email(),
}).required();

export const userSignInSchema = Joi.object({
  username: Joi.string().min(3).max(24).required(),
  password: Joi.string().min(6).max(50).required(),
}).required();