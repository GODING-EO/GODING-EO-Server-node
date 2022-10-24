import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class School {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    schoolName: string;

    @OneToMany(() => Post, (post) => post.school)
    post: Post[];

}