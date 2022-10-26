import { Injectable } from '@nestjs/common';
import { BadRequestError, ConflictError, NotFoundError } from 'src/shared/exception';
import { TopicRepository } from 'src/shared/repositories/topic.repository';


@Injectable()
export class TopicService {
    constructor(
            private readonly topicRepository: TopicRepository
        ) {}

        public async addTopic(topicWord: string) {
            const topic = await this.topicRepository.findOneTopic(topicWord);

            if(!topic) {
                return await this.topicRepository.saveTopic(topicWord);
            } else throw new ConflictError(`The topic already exists`);
        }

        public async findTopic(topicWord: string) {
            return await this.topicRepository.findOneTopic(topicWord);
        }

        public async searchTopic(topicWord: string) {
            const topic =  await this.topicRepository.searchTopic(topicWord);
            console.log(topic);
            if(topic) {
                return topic;
            } else throw new NotFoundError;
        }
}
