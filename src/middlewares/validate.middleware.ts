import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { StatusCodes } from 'http-status-codes';
import {AppError} from "../exceptions/app-error.ts";

export const validate = (type: 'query' | 'params' | 'body' | 'headers', schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[type]);
        if (error) {
            return next(new AppError(error.details.map((v) => v.message).join(', '), StatusCodes.BAD_REQUEST));
        }
        next();
    };
};