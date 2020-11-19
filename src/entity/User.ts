import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birthDate: Date;

    @Column()
    isActive: boolean;

    @Column()
    api_token: string;

    @Column()
    session_token: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date; 
}
