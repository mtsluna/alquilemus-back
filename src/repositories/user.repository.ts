import { DataSource, Repository } from 'typeorm';
import { getDatasource } from "../configs/orm.ts";
import { UserEntity } from "../entities/user.entity.ts";

let instance: UserRepository;

export class UserRepository extends Repository<UserEntity> {
    constructor(dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        return await this.findOne({ where: { username } });
    }
}

export const getUserRepository = () => {

    if(instance == null) {
        instance = new UserRepository(getDatasource());
    }

    return instance;

}