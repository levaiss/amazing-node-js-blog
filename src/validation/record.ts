import Joi from 'joi';

export const recordCreateSchema = Joi.object({
  line: Joi.number().required(),
  valve: Joi.number(),
  valves: Joi.alternatives().conditional('valve', {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.array().min(1).required(),
  }),
  start: Joi.number().min(0).max(1440).required(),
  end: Joi.number().min(0).max(1440).required(),
  type: Joi.string().valid('MM', 'Volume', 'Time').required(),
  amount: Joi.number().positive().required(),
  fertigation: Joi.boolean().required(),
  start_date: Joi.date().required(),
  machine: Joi.number(),
  cycles: Joi.number(),
  interval: Joi.number(),
  field: Joi.any(),
  fert_recipe: Joi.number(),
}).xor('valve', 'valves');