import Joi from 'joi';

export const createCommentValidator = Joi.object({
  text: Joi.string().min(3).required(),
  post: Joi.string().required(),
}).required();
