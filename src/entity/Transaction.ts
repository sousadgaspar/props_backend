import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
const moment = require('moment');
let dueDate = moment().add(3, 'days').format();

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    accountId: string;

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

    @Column({
        default: dueDate
    })
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
