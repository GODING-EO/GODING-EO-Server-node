import { 
    Entity, 
    Column, 
    CreateDateColumn,
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn, 
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Post } from "./post.entity";
import { Comment } from "./comment.entity";
import { PostLike } from "./postLike.entity";
import { TopicLike } from "./topicLike.entity";
import { SchoolLike } from "./schoolLike.entity";



export enum Job {
    etc = '기타',
    middleSchooler = '중학교재학생',
    highSchooler = '고등학교재학생',
    teacher = '선생님',
    parent = '학생부모님'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20, nullable: false, unique: true })
    account_id: string;

    @Column({ length: 60, nullable: false })
    password: string;

    @Column({ length: 11, nullable: false })
    name: string;

    @Column({ type: "enum", enum: Job, default: Job.etc, nullable: false})
    job: Job;

    @OneToMany(() => Post, (post) => post.user)
    post: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comment: Comment[];

    @OneToMany(() => PostLike, (postLike) => postLike.user)
    postLike: PostLike[];

    @OneToMany(() => TopicLike, (topicLike) => topicLike.topic)
    topicLike: TopicLike[];

    @OneToMany(() => SchoolLike, (schoolLike) => schoolLike.user)
    schoolLike: SchoolLike[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}