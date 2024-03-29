import Joi from 'joi';

export const createCommentBodyValidator = Joi.object({
  text: Joi.string().min(3).required(),
  post: Joi.string().required(),
}).required();

export const getCommentsQueryValidator = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(5),
});
