import { School } from "src/school/school.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Topic } from "../topic/topic.entity";

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

    @ManyToOne(() => User, user => user.id, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user_id: number;

    @ManyToOne(() => School, school => school.id, { nullable: false })
    @JoinColumn({ name: 'school_id' })
    school_id: number;

    @ManyToOne(() => Topic, topic => topic.id, { nullable: false })
    @JoinColumn({ name: 'topic_id' })
    topic_id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}