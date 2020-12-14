import {Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Message } from "./Message";

@Entity()
export class Ocasion {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column()
    image: string;

    @ManyToOne(() => Message, message => message.ocasion)
    messages: Message[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
