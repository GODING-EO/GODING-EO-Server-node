import {
    Entity, 
    JoinColumn,
    ManyToOne, 
    PrimaryColumn
} from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class PostLike {
    @PrimaryColumn({ name: 'user_id' })
    user_id: number;

    @PrimaryColumn({ name: 'post_id' })
    post_id: number;

    @ManyToOne(() => User, (user) => user.postLike)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Post, (post) => post.postlike)
    @JoinColumn({ name: 'post_id' })
    post: Post;
}