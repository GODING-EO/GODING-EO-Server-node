import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { BadRequestError, NotFoundError } from 'src/shared/exception';
import { PostRepository } from 'src/shared/repositories/post.repository';
import { PostLikeRepository } from 'src/shared/repositories/postLike.repository';

@Injectable()
export class PostLikeService {
    constructor(
        private readonly postLikeRepository: PostLikeRepository,
        private readonly postRepository: PostRepository
    ) {}

    public async addPostLike(post_id: number, user: User) {
        const post = await this.postRepository.getOnePost(post_id);
        if(post) {
            const like = await this.postLikeRepository.checkLike(post_id, user);
            if(!like) return await this.postLikeRepository.addPostLike(post_id, user);
                else throw new BadRequestError(`already done`);
        } else throw new NotFoundError;
    }
}
