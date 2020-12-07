import {Entity, PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

@Entity()
export class LibraryItem extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    celebrityId: string;

    @Column({
        unique: true
    })
    media: string;

    @Column()
    type: string;

    @Column({
        nullable: true
    })
    path: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
