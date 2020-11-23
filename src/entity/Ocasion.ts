import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Ocasion {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
}
