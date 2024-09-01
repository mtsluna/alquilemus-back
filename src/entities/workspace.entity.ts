import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {v4 as uuid} from "uuid";

@Entity({
    name: "workspace",
})
export class WorkspaceEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @BeforeInsert()
    generateUUID() {
        this.id = uuid();
    }

}