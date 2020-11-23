import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({
        nullable: true
    })
    deletedAt: Date;
    
}