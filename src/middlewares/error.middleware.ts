import { Request, Response, NextFunction } from 'express';
import {AppError} from "../exceptions/app-error.ts";
import {StatusCodes} from "http-status-codes";

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    if (!(err instanceof AppError)) {
        err = new AppError('Internal Server Error', 500);
    }

    console.error(err);

    res.status(err.statusCode).json({
        status: StatusCodes[err.statusCode],
        message: err.message,
    });
}