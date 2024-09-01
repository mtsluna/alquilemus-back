import {BeforeInsert, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {v4 as uuid} from "uuid";
import {WorkspaceEntity} from "./workspace.entity.ts";

export abstract class GenericEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @BeforeInsert()
    generateUUID() {
        this.id = uuid();
    }

    @ManyToOne(() => WorkspaceEntity)
    @JoinColumn({ name: 'workspaceId' })
    workspace: WorkspaceEntity;

    @Column()
    workspaceId: string;

}