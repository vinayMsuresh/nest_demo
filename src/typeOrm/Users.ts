import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User1{

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    email: string;

    @Column({
        nullable: false,
        default: 'abcd'
    })
    username: string;

    @Column({
        nullable: false
    })
    password: string;
}