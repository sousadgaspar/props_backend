import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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

    @Column()
    EMISPaymentReferenceStatus: string;

    @Column()
    EMISPaymentRefenrenceDueDate: Date;

    @Column()
    isComplete: boolean;
}
