import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "../entities/comment.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class CommentRepository{
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ) {}

    async createComment(content: string, user: User, post_id: number) {
        const comment = new Comment();

        comment.content = content;
        comment.user_id = user.id;
        comment.post_id = post_id;

        const newComment = await this.commentRepository.save(comment);

        return newComment;
    }

    async updateComment(content: string, user: User, comment_id: number) {
        return this.commentRepository.createQueryBuilder('comment')
            .update(Comment)
            .set({
                content: content
                })
            .where('id = :comment_id', { comment_id })
            .execute();
    }
}