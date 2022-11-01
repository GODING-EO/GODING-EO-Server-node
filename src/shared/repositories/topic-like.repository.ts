import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TopicLike } from "../entities/topicLike.entity";

@Injectable()
export class TopicLikeRepository {
    constructor(
        @InjectRepository(TopicLike)
        private readonly topicLikeRepository: Repository<TopicLike>
    ) {}
}