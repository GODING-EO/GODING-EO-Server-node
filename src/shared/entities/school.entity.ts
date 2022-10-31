import {
    Entity, 
    Column, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Post } from "./post.entity";
import { SchoolLike } from "./schoolLike.entity";
import { User } from "./user.entity";

@Entity()
export class School {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Post, (post) => post.school)
    post: Post[];

    @OneToMany(() => User, (user) => user.school)
    user: User[];

    @OneToMany(() => SchoolLike, (schoolLike) => schoolLike.school)
    schoolLike: SchoolLike[];
}