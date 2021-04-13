import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, Double, OneToMany, JoinColumn, OneToOne} from "typeorm";
import {PaymentGateway} from './PaymentGateway';
import { User } from "./User";
@Entity()

export class Tenant {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    name: string;
    
    @Column({
        default: null
    })
    description: string;

    @Column({})
    currency: string;

    @Column({})
    paymentGateways: string;

    @OneToMany(() => User, user => user.tenant)
    users: User[];

}