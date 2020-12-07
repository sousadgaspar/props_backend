import {BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Double, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Celebrity } from "./Celebrity";
import { Ocasion } from "./Ocasion";

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
        default: false
    })
    isPublic: boolean;

    @Column({
        nullable: true
    })
    video: string;

    @ManyToOne(() => Celebrity, celebrity => celebrity.messages)
    @JoinColumn()
    celebrity: Celebrity;

    @OneToOne(() => Ocasion)
    @JoinColumn()
    ocasion: Ocasion; 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
    
}
