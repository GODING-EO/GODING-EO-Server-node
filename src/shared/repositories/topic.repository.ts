import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopicDto } from "src/topic/topic.dto";
import { Repository } from "typeorm";
import { Topic } from "../entities/topic.entity";

@Injectable()
export class TopicRepository {
    constructor(
        @InjectRepository(Topic)
        private readonly topicRepository: Repository<Topic>) {}
    
    public async saveTopic(topicDto: TopicDto) {
        const topic = new Topic();

        topic.name = topicDto.name;
        const newTopic = await this.topicRepository.save(topic);

        return newTopic;
    }
    
    public async findOneTopic(topicDto: TopicDto) {
        return await this.topicRepository.findOne({ where: { name: topicDto.name } });
    }
}