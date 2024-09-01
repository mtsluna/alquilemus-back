import Joi from "joi";

export const workspaceSchema = Joi.object({
    workspace: Joi.string().required()
}).unknown();