import Joi from 'joi';

export const modifyClaimsSchema = Joi.object({
    claims: Joi.array().items(Joi.string()),
}).unknown();