import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, Double, OneToMany, JoinColumn, OneToOne} from "typeorm";

@Entity()
export class PaymentGateway {

    @Column()
    name: string;

    @Column()
    description: string;

    generatePaymentReference() {
        return '434 434 979 4';
    }
}