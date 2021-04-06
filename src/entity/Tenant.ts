import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, Double, OneToMany, JoinColumn, OneToOne} from "typeorm";
import {PaymentGateway} from './PaymentGateway';
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

}