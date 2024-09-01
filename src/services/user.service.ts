import {getUserRepository} from "../repositories/user.repository.ts";
import {AppError} from "../exceptions/app-error.ts";
import {StatusCodes} from "http-status-codes";
import {UserEntity} from "../entities/user.entity.ts";

export const modifyClaims = async (id: string, claims: Array<string>) => {
    let existingUser = await getUserRepository().findOneBy({
        id
    })

    if (!existingUser) {
        throw new AppError('User not exist', StatusCodes.NOT_FOUND);
    }

    existingUser.claims = claims;

    return await getUserRepository().save(existingUser);
}

export const findAll = (workspaceId: string) => {
    return getUserRepository().findBy({
        workspaceId
    });
}

export default {
    modifyClaims,
    findAll
}