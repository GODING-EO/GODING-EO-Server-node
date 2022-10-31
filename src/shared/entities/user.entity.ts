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
import { School } from "./school.entity";



export enum Job {
    etc = '기타',
    middleSchooler = '중학교재학생',
    highSchooler = '고등학교재학생',
    teacher = '선생님',
    parent = '학생부모님'
}

export enum Grade {
    none = 0,
    firstGrade = 1,
    secondGrade = 2,
    thirdGrade = 3
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

    @Column({ name: 'school_id' })
    school_id: number;

    @Column({ type: "enum", enum: Grade, default: Grade.none, nullable: false })
    grade: Grade;
    
    @OneToMany(() => Post, (post) => post.user)
    post: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comment: Comment[];

    @OneToMany(() => PostLike, (postLike) => postLike.user)
    postLike: PostLike[];

    @ManyToOne(() => School, (school) => school.user)
    @JoinColumn({ name: 'school_id' })
    school: School;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}