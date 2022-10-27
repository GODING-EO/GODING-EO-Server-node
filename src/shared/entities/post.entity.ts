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
import { Like } from "./like.entity";

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

    @Column({ name: 'school_id' })
    school_id: number;

    @Column({ name: 'topic_id' })
    topic_id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.post, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => School, (school) => school.post, { nullable: false })
    @JoinColumn({ name: 'school_id' })
    school: School;

    @ManyToOne(() => Topic, (topic) => topic.post, { nullable: false })
    @JoinColumn({ name: 'topic_id' })
    topic: Topic;

    @OneToMany(() => Like, (like) => like.post)
    like: Like[];

    @OneToMany(() => Like, (like) => like.post)
    comment: Comment[];
}