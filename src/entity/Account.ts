import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, Double} from "typeorm";

//contribute to the typeOrm lib adding the default fields created_at, updated_at and PrimaryGeneratedColumn
@Entity()
export class Account extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: 0
    })
    value: number;

    @Column({nullable: true})
    bankName: string;

    @Column({nullable: true, unique: true})
    bankAccountNumber: string;

    @Column({nullable: true, unique: true})
    bankAccountIBAN: string;

    @Column({nullable: true})
    userId: string;

    @Column({nullable: true})
    celebrityId: string;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
