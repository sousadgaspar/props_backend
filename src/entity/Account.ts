import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity} from "typeorm";

//contribute to the typeOrm lib adding the default fields created_at, updated_at and PrimaryGeneratedColumn
@Entity()
export class Account extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;


}
