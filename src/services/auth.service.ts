import {getUserRepository} from "../repositories/user.repository.ts";
import bcrypt from "bcryptjs";
import {AppError} from "../exceptions/app-error.ts";
import {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const register = async (username: string, password: string, workspaceId: string) => {

    const existingUser = await getUserRepository().findByUsername(username);
    if (existingUser) {
        throw new AppError('User already exists', StatusCodes.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = getUserRepository().create({
        username,
        password: hashedPassword,
        workspaceId
    });

    await getUserRepository().save(newUser);

}

const login = async (user: any) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        claims: user.claims,
        workspaceId: user.workspaceId,
    }, JWT_SECRET, {
        expiresIn: '10m',
    });

    return {
        token
    };
}

export default {
    register,
    login
}