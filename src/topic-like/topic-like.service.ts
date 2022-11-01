import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { BadRequestError, NotFoundError } from 'src/shared/exception';
import { TopicLikeRepository } from 'src/shared/repositories/topic-like.repository';
import { TopicRepository } from 'src/shared/repositories/topic.repository';

@Injectable()
export class TopicLikeService {
    constructor(
        private readonly topicLikeRepository: TopicLikeRepository,
        private readonly topicRepository: TopicRepository
    ) {}

    public async addTopicLike(topic_id: number, user: User) {
        const topic = await this.topicRepository.getOneTopicById(topic_id);
        if(topic) {
            const like = await this.topicLikeRepository.checkLike(topic_id, user);
            if(!like) return await this.topicLikeRepository.addTopicLike(topic_id,user);
                else throw new BadRequestError(`already done`);
        } else throw new NotFoundError;
    }
}