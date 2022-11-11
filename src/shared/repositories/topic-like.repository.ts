import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TopicLike } from "../entities/topicLike.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class TopicLikeRepository {
    constructor(
        @InjectRepository(TopicLike)
        private readonly topicLikeRepository: Repository<TopicLike>
    ) {}
    
    async addTopicLike(topic_id: number, user: User) {
        const topiclike = new TopicLike();

        topiclike.topic_id = topic_id;
        topiclike.user_id = user.id;

        return await this.topicLikeRepository.save(topiclike);
    }

    async cancelTopicLike(topic_id: number, user: User) {
        return await this.topicLikeRepository.createQueryBuilder('topic_like')
            .delete()
            .from (TopicLike)
            .where('topic_id = :topic_id AND user_id = :user_id', {
                topic_id,
                user_id: user.id
            })
            .execute()
    }

    async checkLike(topic_id: number, user: User) {
        return this.topicLikeRepository.createQueryBuilder('topic_like')
            .select('topic_like.topic_id')
            .addSelect('topic_like.user_id')
            .where('topic_like.topic.id = :topic_id AND topic_like.user_id = :user_id', {
                topic_id,
                user_id: user.id
            })
            .getOne()
    }

    async getLikeTopic(user: User) {
        return this.topicLikeRepository.createQueryBuilder('topic_like')
            .select('topic_like.topic_id')
            .where('topic_like.user_id = :user_id', { user_id : user.id })
            .getMany()
    }
}