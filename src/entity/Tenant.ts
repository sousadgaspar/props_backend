import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, Double, OneToMany, JoinColumn, OneToOne} from "typeorm";

@Entity()

export class Tenant {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({})
    name: string;
    
    @Column({})
    description: string;

    @Column({})
    paymentMethods: [];

    @Column({})
    currency: string;

}