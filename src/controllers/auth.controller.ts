import authService from '../services/auth.service.ts';
import { AppError } from "../exceptions/app-error.ts";
import {StatusCodes} from "http-status-codes";
import passport from "passport";

const register = async (req: any, res: any) => {
    const { username, password, workspaceId } = req.body;

    if (!username || !password || !workspaceId) {
        throw new AppError('Username and password are required', StatusCodes.BAD_REQUEST);
    }

    await authService.register(username, password, workspaceId);

    return res.status(StatusCodes.CREATED).json({ message: 'User registered successfully' });
}

const login = async (req: any, res: any, next: any) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new AppError('Username and password are required', StatusCodes.BAD_REQUEST);
    }

    passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
        if (err || !user) {
            throw new AppError(info, StatusCodes.BAD_REQUEST);
        }

        req.login(user, { session: false }, async (err: any) => {
            if (err) {
                throw new AppError('Something went wrong when try to login', StatusCodes.INTERNAL_SERVER_ERROR)
            }

            const result = await authService.login(user);

            res.status(StatusCodes.OK).send(result);
        });
    })(req, res, next);
}

export default {
    register,
    login
}