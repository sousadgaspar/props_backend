import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

}
