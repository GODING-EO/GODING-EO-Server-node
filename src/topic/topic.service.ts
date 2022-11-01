import { Injectable } from '@nestjs/common';
import { ConflictError } from 'src/shared/exception';
import { TopicRepository } from 'src/shared/repositories/topic.repository';


@Injectable()
export class TopicService {
    constructor(
            private readonly topicRepository: TopicRepository
        ) {}

        public async addTopic(topic_name: string) {
            const topic = await this.topicRepository.getOneTopicByWord(topic_name);

            if(!topic) {
                return await this.topicRepository.addTopic(topic_name);
            } else throw new ConflictError(`The topic already exists`);
        }

        public async getOneTopic(topic_name: string) {
            return await this.topicRepository.getOneTopicByWord(topic_name);
        }

        public async searchTopic(search_word: string) {
            return await this.topicRepository.searchTopic(search_word);
        }
}
