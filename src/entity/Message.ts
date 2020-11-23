import {BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Double, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", {length: 512})
    userId: string;

    @Column("varchar", {length: 512})
    celebrityId: string;

    @Column("varchar", {length: 512})
    ocasionId: string;

    @Column({
        nullable: true
    })
    from: string;

    @Column()
    to: string;

    @Column()
    instructions: string;

    @Column()
    price: number;

    @Column({
        default: 'pending'
    })
    status: string;

    @Column({
        nullable: true
    })
    video: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
    
}
