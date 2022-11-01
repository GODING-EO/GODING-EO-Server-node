import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostLike } from "../entities/postLike.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class PostLikeRepository {
    constructor(
        @InjectRepository(PostLike)
        private readonly postLikeRepository: Repository<PostLike>
    ) {}
    
    async addPostLike(post_id: number, user: User) {
        const postlike = new PostLike();

        postlike.post_id = post_id;
        postlike.user_id = user.id;
        
        return await this.postLikeRepository.save(postlike);
    }

    async checkLike(post_id: number, user: User) {
         return await this.postLikeRepository.createQueryBuilder('post_like')
            .select('post_like.post_id')
            .addSelect('post_like.user_id')
            .where('post_like.post_id = :post_id OR post_like.user_id = :user_id', {
                post_id,
                user_id: user.id 
            })
    }
}