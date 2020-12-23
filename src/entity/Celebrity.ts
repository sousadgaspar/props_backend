import {Entity, PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { User } from "./User";
import { Category } from './Category';
import { Message } from "./Message";

@Entity()
export class Celebrity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, {cascade: true, eager: true})
    @JoinColumn()
    user: User;

    @ManyToMany(() => Category, category => category.celebrities)
    categories: Category[];

    @Column({
        default: 3
    })
    messageResponseTime: number;

    @OneToMany(() => Message, message => message.celebrity)
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
