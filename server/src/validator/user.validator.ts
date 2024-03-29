// Core
import Joi from 'joi';

// Helpers
import { Roles } from '../config/roles.config';

export const userRegistrationBodyValidator = Joi.object({
  username: Joi.string().min(3).max(24).required(),
  password: Joi.string().min(6).max(50).required(),
  avatar: Joi.string().uri().allow(''),
  email: Joi.string().email().required(),
}).required();

export const userLoginBodyValidator = Joi.object({
  username: Joi.string().min(3).max(24).required(),
  password: Joi.string().min(6).max(50).required(),
}).required();

export const userProfileBodyValidator = Joi.object({
  username: Joi.string().min(3).max(24),
  avatar: Joi.string().uri().allow(''),
  email: Joi.string().email(),
}).min(1);

export const userRoleBodyValidator = Joi.object({
  role: Joi.number().valid(Roles.USER, Roles.EDITOR).required(),
}).required();
