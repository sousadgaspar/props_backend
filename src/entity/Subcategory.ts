import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './Category';


@Entity()
export class Subcategory extends BaseEntity {

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

    @ManyToOne(() => Category, category => category.subcategories)
    @JoinColumn()
    category: Category;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({
        nullable: true
    })
    deletedAt: Date;
    
}