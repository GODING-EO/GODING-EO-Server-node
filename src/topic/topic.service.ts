import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/shared/entities/topic.entity';
import { BadRequestError } from 'src/shared/exception';
import { TopicRepository } from 'src/shared/repositories/topic.repository';
import { TopicDto } from './topic.dto';

@Injectable()
export class TopicService {
    constructor(
            public readonly topicRepository: TopicRepository
        ) {}

        public async addTopic(topicDto: TopicDto) {
            const topic = await this.topicRepository.findOneTopic(topicDto);

            if(!topic) {
                return await this.topicRepository.saveTopic(topicDto);
            } else throw new BadRequestError;
        }

        public async findTopic(topicDto: TopicDto) {
            return await this.topicRepository.findOneTopic(topicDto);
        }
}
