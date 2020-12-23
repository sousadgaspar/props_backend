import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Celebrity } from './Celebrity';
import { Subcategory } from './Subcategory';
import { User } from './User';


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

    @Column()
    image: string;

    @ManyToMany(() => Celebrity, celebrity => celebrity.categories)
    @JoinTable()
    celebrities: Celebrity[];

    @OneToMany(() => Subcategory, subcategory => subcategory.category, {eager: true})
    @JoinColumn()
    subcategories: Category[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({
        nullable: true
    })
    deletedAt: Date;
    
}