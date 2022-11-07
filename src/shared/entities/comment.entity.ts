import {
    Entity,
    Column,
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn,
    CreateDateColumn,UpdateDateColumn 
} from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false })
    content: string;

    @Column({ name: 'user_id' })
    user_id: number;

    @Column({ name: 'post_id' })
    post_id: number;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @ManyToOne(() => User, (user) => user.post, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Post, (post) => post.comment, { nullable: false })
    @JoinColumn({ name: 'post_id' })
    post: Post;
}