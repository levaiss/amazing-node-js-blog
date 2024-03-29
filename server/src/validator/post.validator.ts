import Joi from 'joi';

export const createPostBodyValidator = Joi.object({
  title: Joi.string().min(3).required(),
  preview: Joi.string().uri().allow(''),
  body: Joi.string().min(60).required(),
  categories: Joi.array()
    .items(
      Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message('Invalid category id'),
    )
    .optional(),
}).required();

export const updatePostBodyValidator = Joi.object({
  title: Joi.string().min(3),
  preview: Joi.string().uri().allow(''),
  body: Joi.string().min(60),
  categories: Joi.array()
    .items(
      Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message('Invalid category id'),
    )
    .optional(),
}).min(1);

export const getPostsQueryValidator = Joi.object({
  category: Joi.string(),
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(5),
});
