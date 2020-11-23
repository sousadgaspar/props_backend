import {Entity, PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

@Entity()
export class Celebrity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: true
    })
    firstName: string;

    @Column({
        nullable: true
    })
    lastName: string;

    @Column()
    nickName: string;

    @Column({
        nullable: true
    })
    avatar: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    categoryId: string;

    @Column()
    subcategoryId: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column({
        default: 3
    })
    messageResponseTime: number;

    @Column()
    messagePrice: number;

    @Column({
        default: 'kz'
    })
    messagePriceCurrency: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({
        nullable: true
    })
    deletedAt: Date;
}
