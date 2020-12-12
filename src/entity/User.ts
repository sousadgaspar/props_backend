import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany} from "typeorm";
import {Account} from './Account';
import {Message} from './Message';

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column({
        nullable: true
    })
    lastName: string;

    @Column({
        nullable: true
    })
    nickName: string;

    @Column({
        nullable: true
    })
    avatar: string;

    @Column({
        nullable: true
    })
    gender: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: true
    })
    telephoneNumber: string;

    @Column()
    password: string;

    @Column({
        nullable: true
    })
    birthDate: Date;

    @Column({
        default: true
    })
    isActive: boolean;

    @Column({
        nullable: true
    })
    api_token: string;

    @Column({
        nullable: true
    })
    session_token: string;

    @OneToOne(() => Account, {eager: true, cascade: true})
    @JoinColumn()
    account: Account;

    @OneToMany(() => Message, message => message.userId, {eager: true, cascade: true})
    @JoinColumn()
    messages: Message[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 

    @DeleteDateColumn()
    deleted_at: Date; 
}
