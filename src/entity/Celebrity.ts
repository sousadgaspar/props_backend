import {Entity, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity()
export class Celebrity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

}
