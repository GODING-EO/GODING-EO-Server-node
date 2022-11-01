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
    
    async addTopic(topic_name: string) {
        const topic = new Topic();

        topic.name = topic_name;
        const newTopic = await this.topicRepository.save(topic);

        return newTopic;

        // return await this.topicRepository.createQueryBuilder()
        //     .insert()
        //     .into(Topic)
        //     .values([
        //         { topic_name: topic_name }
        //     ])
        //     .execute(); 
    }
    
    async getOneTopicById(topic_id: number) {
        // return await this.topicRepository.findOne({ where: { name: topicWord } });

        return await this.topicRepository.createQueryBuilder('topic')
            .select('topic.name')
            .addSelect('topic.id')
            .where('topic.id = :topic_id', { topic_id })
            .getOne();
    }

    async getOneTopicByWord(topic_name: string) {
        return await this.topicRepository.createQueryBuilder('topic')
            .select('topic.name')
            .addSelect('topic.id')
            .where('topic.name = :topic_name', { topic_name })
            .getOne();
    }

    async searchTopic(search_word: string) {
        // return this.topicRepository.find({
        //     where: { topic_name: Like(`%${searchWord}%`) },
        // });
        
        return this.topicRepository.createQueryBuilder('topic')
            .select('topic.name')
            .where('topic.name like :topic_name', {
                topic_name : `%${search_word}%`
            })
            .getMany();
    }
}