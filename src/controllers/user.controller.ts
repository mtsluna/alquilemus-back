import userService from "../services/user.service.ts";
import {AppError} from "../exceptions/app-error.ts";
import {StatusCodes} from "http-status-codes";
import {UserDto} from "../dto/user.dto.ts";

export const modifyClaims = async (req: any, res: any) => {

    const { id } = req.params;

    if(!id) {
        throw new AppError(`User id on the path it's required`, StatusCodes.BAD_REQUEST);
    }

    const { claims } = req.body;

    const result = await userService.modifyClaims(id, claims);

    res.status(200).send(new UserDto(result))
}

export const getAll = async (req: any, res: any) => {
    const { workspace } = req.user;

    res.status(200).send(await userService.findAll(workspace));
}

export default {
    modifyClaims,
    getAll
}