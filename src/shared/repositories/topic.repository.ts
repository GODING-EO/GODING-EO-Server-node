import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Topic } from "../entities/topic.entity";

@Injectable()
export class TopicRepository {
    constructor(
        @InjectRepository(Topic)
        private readonly topicRepository: Repository<Topic>
    ) {}
    
    async addTopic(topicWord: string) {
        const topic = new Topic();

        topic.topic_name = topicWord;
        const newTopic = await this.topicRepository.save(topic);

        return newTopic;

        // return await this.topicRepository.createQueryBuilder()
        //     .insert()
        //     .into(Topic)
        //     .values([
        //         { topic_name: topicWord }
        //     ])
        //     .execute(); 
    }
    
    async getOneTopic(topicWord: string) {
        // return await this.topicRepository.findOne({ where: { name: topicWord } });

        return await this.topicRepository.createQueryBuilder('topic')
            .select('topic.topic_name')
            .addSelect('topic.id')
            .where('topic.topic_name = :topicWord', { topicWord })
            .getOne();
    }

    async searchTopic(searchWord: string) {
        // return this.topicRepository.find({
        //     where: { topic_name: Like(`%${searchWord}%`) },
        // });
        
        return this.topicRepository.createQueryBuilder('topic')
            .select('topic.topic_name')
            .where('topic.topic_name like :topic_name', {
                topic_name : `%${searchWord}%`
            })
            .getMany();
    }
}