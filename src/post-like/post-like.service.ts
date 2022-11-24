import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { BadRequestError, ConflictError, NotFoundError } from 'src/shared/exception';
import { PostRepository } from 'src/shared/repositories/post.repository';
import { PostLikeRepository } from 'src/shared/repositories/post-like.repository';

@Injectable()
export class PostLikeService {
    constructor(
        private readonly postLikeRepository: PostLikeRepository,
        private readonly postRepository: PostRepository
    ) {}

    public async PostLike(post_id: number, user: User): Promise<boolean> {
        const post = await this.postRepository.getOnePost(post_id);
        if(post) {
            const like = await this.postLikeRepository.checkLike(post_id, user);
            if(!like) {
                await this.postLikeRepository.addPostLike(post_id, user); 
                return true;
            }
            else if(like) {
                await this.postLikeRepository.canclePostLike(post_id, user);
                return false; 
            }
        } else throw new NotFoundError;
    }

    public async CanclePostLike(post_id: number, user: User) {
        const post = await this.postRepository.getOnePost(post_id);
        if(post) {
            const like = await this.postLikeRepository.checkLike(post_id, user);
            if(!like) throw new BadRequestError(`already done`);
                else return await this.postLikeRepository.canclePostLike(post_id, user);
        } else throw new NotFoundError;
    }

    public async CountPostLike(post_id: number) {
        const post = await this.postRepository.getOnePost(post_id);
        if(post) return await this.postLikeRepository.countPostLike(post_id);
        throw new NotFoundError;
    }
}
