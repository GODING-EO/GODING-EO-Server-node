import { Injectable } from '@nestjs/common';
import { BadRequestError, ConflictError, NoContent, } from 'src/shared/exception';
import { TopicRepository } from 'src/shared/repositories/topic.repository';


@Injectable()
export class TopicService {
    constructor(
            private readonly topicRepository: TopicRepository
        ) {}

        public async addTopic(topicWord: string) {
            const topic = await this.topicRepository.getOneTopic(topicWord);

            if(!topic) {
                return await this.topicRepository.addTopic(topicWord);
            } else throw new ConflictError(`The topic already exists`);
        }

        public async getOneTopic(topicWord: string) {
            return await this.topicRepository.getOneTopic(topicWord);
        }

        public async searchTopic(topicWord: string) {
            return await this.topicRepository.searchTopic(topicWord);
        }
}
