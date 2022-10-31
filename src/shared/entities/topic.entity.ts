import { 
    Entity, 
    Column,
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Post } from "./post.entity";
import { TopicLike } from "./topicLike.entity";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @OneToMany(() => Post, (post) => post.topic)
    post: Post[];

    @OneToMany(() => TopicLike, (topicLike) => topicLike.topic)
    topicLike: TopicLike[];
}