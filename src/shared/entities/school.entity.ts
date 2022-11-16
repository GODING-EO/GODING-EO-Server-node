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

    @Column()
    type: string;

    @Column()
    location: string;
    
    @Column()
    adress: string;

    @Column()
    phone: string;

    @Column()
    url: string;

    @Column()
    division: string;

    @OneToMany(() => Post, (post) => post.school)
    post: Post[];

    @OneToMany(() => SchoolLike, (schoolLike) => schoolLike.school)
    schoolLike: SchoolLike[];
}