import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class School {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    schoolName: string;
}