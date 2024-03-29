import Joi from 'joi';

export const createCategoryBodyValidator = Joi.object({
  name: Joi.string().min(3).required(),
}).required();
