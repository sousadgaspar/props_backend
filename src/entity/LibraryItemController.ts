import {Entity, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity()
export class LibraryItem extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

}
