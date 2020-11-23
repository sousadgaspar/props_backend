import {Column, CreateDateColumn, DeleteDateColumn, Double, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Message {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: number;

    @Column()
    celebrityId: number;

    @Column()
    ocasionId: number;

    @Column()
    instructions: string;

    @Column()
    price: Double;

    @Column()
    status: string;

    @Column()
    video: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
    
}
