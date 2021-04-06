import {Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Account } from "./Account";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Account, account => account.transactions)
    account: Account;

    @Column()
    messageId: string;

    @Column()
    valueBeforeTransaction: number;
    
    @Column()
    valueAfterTransaction: number;

    @Column()
    value: number;

    @Column()
    type: string;

    @Column()
    EMISPaymentReference: string;

    @Column({
        default: 'pending'
    })
    EMISPaymentReferenceStatus: string;

    @Column()
    EMISPaymentRefenrenceDueDate: Date;

    @Column({
        default: false
    })
    isComplete: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
