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

    async updateComment(content: string, comment_id: number) {
        return this.commentRepository.createQueryBuilder('comment')
            .update(Comment)
            .set({
                content: content
                })
            .where('id = :comment_id', { comment_id })
            .execute();
    }

    async deleteComment(comment_id: number) {
        return this.commentRepository.createQueryBuilder('comment')
            .delete()
            .from(Comment)
            .where('id = :comment_id', { comment_id })
            .execute()
    }
    
    async deleteAllComment(post_id: number) {
        return this.commentRepository.createQueryBuilder('comment')
            .delete()
            .from(Comment)
            .where('post_id = :post_id', { post_id })
            .execute();
    }
    
    async getAllComment(post_id: number) {
        return this.commentRepository.createQueryBuilder('comment')
            .select('comment.id')
            .addSelect('comment.content')
            .addSelect('user.name')
            .addSelect('comment.post_id')
            .innerJoin('comment.user','user')
            .where('comment.post_id = :post_id', { post_id })
            .getMany();
    }

    async getOneComment(comment_id: number) {
        return await this.commentRepository.createQueryBuilder('comment') 
            .select('comment.id')
            .addSelect('comment.content')
            .addSelect('comment.user_id')
            .addSelect('comment.post_id')
            .addSelect('user.name')
            .innerJoin('comment.user', 'user')
            .where('comment.id = :comment_id', { comment_id })
            .getOne();
    }

    async checkUserbyWrtier(comment_id: number, user: User): Promise<boolean> {
        const writer = (await this.getOneComment(comment_id)).user_id;
        if(writer == user.id) return true;
        return false;
    }
}