import { Post } from "./post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    topic_name: string;

    @OneToMany(() => Post, (post) => post.topic)
    post: Post[];

}