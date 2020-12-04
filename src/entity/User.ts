import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, BaseEntity} from "typeorm";

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
    avatar: string;

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 

    @DeleteDateColumn()
    deleted_at: Date; 
}
