import { UserEntity } from "../entities/user.entity.ts";

export class UserDto {

    id: string;
    username: string;
    claims: string[] = [];

    constructor(user: Partial<UserEntity>) {
        Object.assign(this, user);

        // @ts-ignore
        delete this['password'];
    }

}