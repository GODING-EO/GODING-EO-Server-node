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

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable: false })
    location: string;
    
    @Column({ nullable: false })
    adress: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    url: string;

    @Column({ nullable: false })
    division: string;

    @Column({ nullable: true })
    image_url: string;

    @OneToMany(() => Post, (post) => post.school)
    post: Post[];

    @OneToMany(() => SchoolLike, (schoolLike) => schoolLike.school)
    schoolLike: SchoolLike[];
}