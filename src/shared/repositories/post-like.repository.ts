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

    async canclePostLike(post_id: number, user: User) {
        return this.postLikeRepository.createQueryBuilder('post_like')
            .delete()
            .from(PostLike)
            .where('post_id = :post_id OR user_id = :user_id', {
                post_id,
                user_id: user.id
            })
            .execute()
    }

    async deleteAllLike(post_id: number) {
        return this.postLikeRepository.createQueryBuilder('post_like')
        .delete()
        .from(PostLike)
        .where('post_id = :post_id', { post_id })
        .execute()
    }

    async checkLike(post_id: number, user: User) {
        return this.postLikeRepository.createQueryBuilder('post_like')
            .select('post_like.post_id')
            .addSelect('post_like.user_id')
            .where('post_like.post_id = :post_id OR post_like.user_id = :user_id', {
                post_id,
                user_id: user.id 
            })
            .getOne()
    }

    async countPostLike(post_id: number) {
        return this.postLikeRepository.createQueryBuilder('post_like')
            .where('post_like.post_id = :post_id', { post_id })
            .getCount();
    }
}