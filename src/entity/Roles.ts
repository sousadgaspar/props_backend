import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Roles {

    @PrimaryGeneratedColumn('uuid')
    id: string;

}
