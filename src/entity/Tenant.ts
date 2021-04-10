import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, Double, OneToMany, JoinColumn, OneToOne} from "typeorm";
import {PaymentGateway} from './PaymentGateway';
import { User } from "./User";
@Entity()

export class Tenant {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({})
    name: string;
    
    @Column({})
    description: string;

    @Column({})
    currency: string;

    @Column({})
    paymentGateways: string;

    @ManyToOne(() => User, user => user.tenants)
    user: User[];

}