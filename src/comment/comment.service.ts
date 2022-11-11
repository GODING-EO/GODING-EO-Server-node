import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { ForbiddenError, NotFoundError } from 'src/shared/exception';
import { CommentRepository } from 'src/shared/repositories/comment.repository';
import { PostRepository } from 'src/shared/repositories/post.repository';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly postRepository: PostRepository
    ) {}

    public async createComment(content: string, user: User, post_id: number) {
        if(!await this.postRepository.getOnePost(post_id)) throw new NotFoundError;
        return await this.commentRepository.createComment(content, user, post_id);
    }

    public async getAllComment(post_id: number) {
        return await this.commentRepository.getAllComment(post_id);
    }
    
    public async updateComment(content: string, user: User, comment_id: number) {
        if(!await this.commentRepository.getOneComment(comment_id)) {
            throw new NotFoundError;
        } else if(await this.commentRepository.checkUserbyWrtier(comment_id, user) == true) {
            return await this.commentRepository.updateComment(content, comment_id);
        } throw new ForbiddenError;
    }

    public async deleteComment(user: User, comment_id: number) {
        if(!await this.commentRepository.getOneComment(comment_id)) {
            throw new NotFoundError;
        } else if(await this.commentRepository.checkUserbyWrtier(comment_id, user) == true) {
            return await this.commentRepository.deleteComment(comment_id);
        } throw new ForbiddenError;
    }
}   
