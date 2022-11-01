import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostLike } from "../entities/postLike.entity";

@Injectable()
export class PostLikeRepository {
    constructor(
        @InjectRepository(PostLike)
        private readonly postLikeRepository: Repository<PostLike>
    ) {}
}