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

    @Column({
        default: true
    })
    isAvailable: boolean;

    @Column({
        default: false
    })
    isVerified: boolean;

    @OneToMany(() => Message, message => message.celebrity, {eager: true})
    messages: Message[];

    @Column()
    messagePrice: number;

    @Column({
        nullable: true
    })
    facebookProfile: string;

    @Column({nullable: true})
    twitterProfile: string;

    @Column({nullable: true})
    instagramProfile: string;

    @Column({nullable: true})
    youtubeProfile: string;

    @Column({nullable: true})
    tiktokProfile: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({
        nullable: true
    })
    deletedAt: Date;
}
