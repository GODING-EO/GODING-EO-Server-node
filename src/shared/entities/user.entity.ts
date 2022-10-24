import { Post } from "./post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Like } from "./like.entity";


export enum Job {
    etc = 0,
    middleSchooler = 1,
    highSchooler = 2,
    teacher = 3,
    parent = 4
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

    @Column({ type: "enum", enum: Grade, default: Grade.none, nullable: false })
    grade: Grade;
    
    @OneToMany(() => Post, (post) => post.user)
    post: Post[];

    @OneToMany(() => Like, (like) => like.user)
    like: Like[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}