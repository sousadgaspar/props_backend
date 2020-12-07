import {Entity, PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { User } from "./User";
import { Category } from './Category';
import { Message } from "./Message";

@Entity()
export class Celebrity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @Column({
        default: 3
    })
    messageResponseTime: number;

    @OneToMany(() => Message, message => message.celebrityId)
    @JoinColumn()
    messages: Message[];

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
