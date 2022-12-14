import {
    Entity, 
    Column, 
    CreateDateColumn,
    JoinColumn,
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { User } from "./user.entity";
import { School } from "./school.entity";
import { Topic } from "./topic.entity";
import { PostLike } from "./postLike.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25, nullable: false })
    title: string;

    @Column({ length: 255, nullable: false })
    content: string;

    @Column({ nullable: true })
    image: string;

    @Column({ name: 'user_id' })
    user_id: number;

    @Column({ name: 'school_id', default: null })
    school_id: number;

    @Column({ name: 'topic_id', default: null })
    topic_id: number;

    @Column({ default: 0 })
    reports: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.post, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => School, (school) => school.post)
    @JoinColumn({ name: 'school_id' })
    school: School;

    @ManyToOne(() => Topic, (topic) => topic.post)
    @JoinColumn({ name: 'topic_id' })
    topic: Topic;

    @OneToMany(() => PostLike, (like) => like.post)
    postlike: PostLike[];

    @OneToMany(() => Comment, (comment) => comment.post)
    comment: Comment[];
}