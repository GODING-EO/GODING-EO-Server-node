import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Topic } from "./topic.entity";
import { User } from "./user.entity";

@Entity()
export class TopicLike {
    @PrimaryColumn({ name: 'user_id' })
    user_id: number;

    @PrimaryColumn({ name: 'topic_id' })
    topic_id: number;

    @ManyToOne(() => User, (user) => user.topicLike)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Topic, (topic) => topic.topicLike)
    @JoinColumn({ name: 'topic_id' })
    topic: Topic;
}