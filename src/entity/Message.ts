import {BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Double, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Celebrity } from "./Celebrity";
import { Transaction } from "./Transaction";
import { Ocasion } from "./Ocasion";
import { User } from "./User";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

@Entity()
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

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
        default: "$"
    })
    currency: string;

    @Column({
        default: 'pending'
    })
    status: string;

    @Column({
        default: false
    })
    isPublic: boolean;

    @Column({
        nullable: true
    })
    video: string;

    @Column({
        nullable: true
    })
    comments: string;

    @ManyToOne(() => User, user => user.messages)
    user: User;

    @ManyToOne(() => Celebrity, celebrity => celebrity.messages)
    celebrity: Celebrity;

    @ManyToOne(() => Ocasion, ocasion => ocasion.messages)
    @JoinColumn()
    ocasion: Ocasion; 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
    
}
