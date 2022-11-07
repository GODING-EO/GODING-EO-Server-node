import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';
import { CommentRepository } from 'src/shared/repositories/comment.repository';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository
    ) {}

    public async createComment(content: string, user: User, post_id: number) {
        return await this.commentRepository.createComment(content, user, post_id);
    }
}   
