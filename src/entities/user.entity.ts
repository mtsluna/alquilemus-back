import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from 'typeorm';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import {GenericEntity} from "./generic.entity.ts";

@Entity({
    name: 'user'
})
export class UserEntity extends GenericEntity {

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column("simple-json", { nullable: true })
    claims: string[] = [];

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}