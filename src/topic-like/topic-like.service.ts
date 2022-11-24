import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { BadRequestError, ConflictError, NotFoundError } from 'src/shared/exception';
import { TopicLikeRepository } from 'src/shared/repositories/topic-like.repository';
import { TopicRepository } from 'src/shared/repositories/topic.repository';

@Injectable()
export class TopicLikeService {
    constructor(
        private readonly topicLikeRepository: TopicLikeRepository,
        private readonly topicRepository: TopicRepository
    ) {}

    public async TopicLike(topic_id: number, user: User): Promise<boolean> {
        const topic = await this.topicRepository.getOneTopicById(topic_id);
        if(topic) {
            const like = await this.topicLikeRepository.checkLike(topic_id, user);
            if(!like) {
                await this.topicLikeRepository.addTopicLike(topic_id,user);
                return true;
            }
            else if(like) {
                await this.topicLikeRepository.cancelTopicLike(topic_id, user);
                return false;
            }
        } else throw new NotFoundError;
    }
}
